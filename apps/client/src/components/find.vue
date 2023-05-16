<template>
    <div v-if="matchVisible" class="find" :class="{ loading: matchVisible }">
        <div class="content" :style="`background-image:url(${image})`"></div>
        <div class="bgp"></div>
        <div class="animation"></div>
        <div class="tips"></div>
    </div>
    <img
        v-if="animation"
        alt="treasures"
        class="treasures"
        :class="[animation]"
        :src="loadAssets(`treasures${cardNo}.png`)"
    />
    <div v-if="resultVisible" class="result" @click="handleResult">
        <img alt="result" class="box" :src="loadAssets(result + '.gif')" />
        <template v-if="cardNo > 0">
            <img alt="card" class="card" :src="loadAssets(`card${cardNo}.png`)" />
            <img v-if="result === Result.REPEAT" alt="repeat" class="repeat" src="@/assets/text-get.png" />
            <img v-else alt="light" class="light" src="@/assets/light.png" />
        </template>
    </div>
    <div class="find-btn" @click="handleFind">
        <input ref="refsFile" accept="image/*" capture style="display: none" type="file" @change="handleFileChange" />
        <img alt="find" src="@/assets/btn-find.png" />
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { loadAssets, addCard, hasCard, compressImage } from '@/utils';
    import { matchImage } from '@/api/file';
    import { showDialog } from 'vant';
    const props = defineProps<{
        disabled?: boolean;
    }>();
    const matchVisible = ref(false);
    const el = document.scrollingElement as HTMLElement;
    watch(matchVisible, (value) => {
        if (value) {
            el.style.overflow = 'hidden';
        } else {
            el.style.overflow = 'auto';
        }
    });
    const refsFile = ref<HTMLInputElement>();
    const image = ref('');
    const handleFind = () => {
        if (!props.disabled) {
            refsFile.value!.click();
        }
    };
    const handleFileChange = async () => {
        const file = refsFile.value!.files?.[0];
        if (file) {
            try {
                const size = 4 * 1024 * 1024;
                image.value = await compressImage(file, size / 2, 2000);
                if (image.value.length > size) {
                    throw '请重新拍照试试（4M以内）';
                } else {
                    matchVisible.value = true;
                    handleMatch();
                }
            } catch (e) {
                showDialog({ message: typeof e === 'string' ? e : '上传失败' });
            }
        }
        refsFile.value!.value = '';
    };
    const handleMatch = async () => {
        const name = await matchImage(image.value);
        if (name) {
            cardNo.value = +name;
        } else {
            cardNo.value = 0;
        }
        if (cardNo.value) {
            if (hasCard(cardNo.value)) {
                result.value = Result.REPEAT;
            } else {
                result.value = Result.NEWS;
            }
        } else {
            result.value = Result.EMPTY;
        }
        resultVisible.value = true;
        matchVisible.value = false;
    };

    const resultVisible = ref(false);
    enum Result {
        EMPTY = 'card-empty',
        NEWS = 'card-news',
        REPEAT = 'card-repeat',
    }
    const result = ref(Result.EMPTY);
    const cardNo = ref(0);
    const animation = ref('');
    const handleResult = async () => {
        if (result.value === Result.NEWS) {
            addCard(cardNo.value);
            animation.value = 'show';
            setTimeout(() => {
                animation.value = 'active';
                setTimeout(() => {
                    animation.value = '';
                }, 1500);
            }, 500);
        }
        resultVisible.value = false;
    };
</script>

<style scoped lang="less">
    @keyframes matching {
        from {
            background-color: rgba(0, 0, 0, 0.3);
        }
        to {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
    .find {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        &.loading {
            .bgp {
                animation: matching 0.6s ease-out 0s infinite alternate forwards;
            }
        }
        .content {
            width: 100%;
            height: 100%;
            background: #000 url() center center / contain no-repeat;
        }
        .bgp {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3) url('../assets/find-bgp.png') center center / contain repeat;
        }
        .tips {
            position: absolute;
            top: 10%;
            left: 0;
            right: 0;
            margin: auto;
            width: 60%;
            aspect-ratio: 8 / 1;
            background: url('../assets/find-tips.png') center center / contain no-repeat;
        }
        .animation {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 100%;
            aspect-ratio: 1;
            background: url('../assets/find-animation.gif') center center / contain no-repeat;
        }

        .btn {
            position: absolute;
            bottom: 10%;
            left: 0;
            right: 0;
            margin: auto;
            width: 100px;
            height: 100px;
            text-align: center;
            img {
                width: 100%;
                height: 100%;
            }
            p {
                margin-top: 10px;
            }
        }
    }
    .result {
        width: 100%;
        height: 100%;
        z-index: 100;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.8);
        img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        .box {
            width: 100%;
        }
        .card {
            width: 40%;
            top: 6.6%;
            right: 7%;
        }
        .light {
            width: 80%;
            right: 5%;
        }
        .repeat {
            width: 30%;
            right: 10%;
            top: 12%;
        }
    }
    @keyframes show {
        from {
            opacity: 0;
            transform: scale(0);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    @keyframes active {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        to {
            opacity: 0;
            width: 0;
            left: 95%;
            top: 27%;
        }
    }
    .treasures {
        width: 60%;
        position: fixed;
        top: 40%;
        left: 20%;
        z-index: 20;
        opacity: 0;
        &.show {
            animation: show 0.5s ease-in 0s 1 forwards;
        }
        &.active {
            animation: active 1.5s ease-out 0s 1 forwards;
        }
    }
    .find-btn {
        position: fixed;
        bottom: 10px;
        left: 0;
        right: 0;
        margin: auto;
        width: 50%;
        max-width: 200px;
        z-index: 99;
        img {
            width: 100%;
        }
    }
</style>
