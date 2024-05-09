<template>
    <div class="scan-container x-flex col col-center row-center">
        <canvas ref="refsCanvas" height="300" width="300"></canvas>
        <div class="info x-flex col">
            <p v-if="!ready" class="target x-flex">
                <span class="label">设备：</span>
                <span class="value">未检测到摄像头</span>
            </p>
            <p class="target x-flex">
                <span class="label">目标：</span>
                <span class="value">
                    {{ schoolLocation }}
                </span>
            </p>
            <p class="location x-flex">
                <span class="label">定位：</span>
                <span class="value">{{ [location.lng, location.lat] }}</span>
            </p>
            <p class="address x-flex">
                <span class="label">地址：</span>
                <span class="value">{{ location.address }}</span>
            </p>
            <p class="address x-flex">
                <span class="label">结果：</span>
                <span class="value">距离{{ ~~distance }}米，{{ ~~distance > 500 ? '超出范围' : '在范围内' }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { showToast, showFailToast, showLoadingToast, showDialog } from 'vant';
    import jsQR from 'jsqr';
    import { schoolLocation, getCurrentPosition, getDistance } from '@/utils';
    import { BookingStatus, SignType } from '@pkgs/model';

    const layout = useLayoutStore();
    layout.title = '扫码签到';

    const refsCanvas = ref<HTMLCanvasElement>();
    const ready = ref(false);
    const video = document.createElement('video');
    const location = ref({ address: '', lng: 0, lat: 0 });
    const distance = computed(() => {
        const { lng, lat } = location.value;
        const [slng, slat] = schoolLocation;
        return lng && lat ? getDistance([lng, lat], [slng, slat]) : 99999;
    });

    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const handleSign = async (data: string) => {
        let success = false;
        if (distance.value >= 500) {
            await showDialog({
                title: '提示',
                message: '您不在签到范围内',
                showCancelButton: false,
            });
        } else {
            const loading = showLoadingToast('正在验证二维码');
            let url: URL | undefined;
            try {
                url = new URL(data);
            } catch (e) {
                showFailToast('无效的二维码');
            }
            if (url) {
                // if (url.origin !== window.location.origin) {
                //     throw new Error(url.origin);
                // }
                const search = new URLSearchParams(url.search);
                const roomId = search.get('roomId')!;
                const seatNo = search.get('seatNo')!;
                const bookingId = +(route.params.id as string);
                const type = +(route.params.type as string) as SignType;

                const item = await api.getBooking(bookingId);
                if (!item) {
                    showFailToast('无效的预约');
                    router.back();
                } else {
                    if (item.roomId !== +roomId || item.seatNo !== +seatNo) {
                        await showDialog({
                            title: '验证失败',
                            message: '二维码与预约不匹配',
                            showCancelButton: false,
                        });
                    } else {
                        const signId = await api.createSign({
                            userId: userStore.profile!.id,
                            longitude: location.value.lng,
                            latitude: location.value.lat,
                            location: location.value.address,
                            type,
                        });
                        let status = item.status;
                        if (type === SignType.SIGN_IN) {
                            status = BookingStatus.FULFILL;
                        } else if (type === SignType.SIGN_PAUSE) {
                            status = BookingStatus.LEAVED;
                        } else if (type === SignType.SIGN_OUT) {
                            status = BookingStatus.DONE;
                        }
                        let action = '';
                        if (type === SignType.SIGN_IN) {
                            action = '签到';
                        } else if (type === SignType.SIGN_PAUSE) {
                            action = '暂离';
                        } else if (type === SignType.SIGN_OUT) {
                            action = '签退';
                        }
                        if (signId) {
                            const res = await api.statusBooking({ id: bookingId, status });
                            if (res) {
                                item.status = status;
                                showToast(action + '成功');
                                success = true;
                                router.back();
                            } else {
                                showToast('更新预约状态失败');
                            }
                        } else {
                            showToast(action + '失败');
                        }
                    }
                }
            }
            loading.close();
        }
        return success;
    };
    const update = async () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const cvs = refsCanvas.value!;
            const canvas = cvs.getContext('2d')!;
            cvs.height = video.videoHeight;
            cvs.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, cvs.width, cvs.height);
            const imageData = canvas.getImageData(0, 0, cvs.width, cvs.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            });
            if (code?.data) {
                if (await handleSign(code.data)) {
                    return;
                }
            }
        } else {
            showToast('正在开启摄像头');
        }
        requestAnimationFrame(update);
    };
    const init = async () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: { facingMode: 'environment' },
            })
            .then((stream) => {
                showToast('获取摄像头成功');
                video.srcObject = stream;
                video.setAttribute('playsinline', 'true');
                video.play();
                ready.value = true;
                update();
            })
            .catch((e) => {
                console.log(e.name + ': ' + e.message);
                console.error(e);
                if (e.name === 'NotReadableError') {
                    showDialog({
                        title: '环境异常',
                        message: `当前浏览器环境【${navigator.userAgent}】无法访问摄像头，请尝试使用其他浏览器打开此页面`,
                    });
                } else {
                    showToast(e.name + ': ' + e.message);
                }
            });

        location.value = await getCurrentPosition();
    };
    onActivated(init);
</script>

<style scoped lang="less">
    .scan-container {
        padding: var(--gap);
        background: var(--fc);
        color: var(--bgc);
        gap: var(--gap);
        canvas {
            width: 240px;
            border: 3px solid var(--blue);
        }
        .info {
            gap: var(--gap-mini);
            .label {
                white-space: nowrap;
            }
        }
    }
</style>
