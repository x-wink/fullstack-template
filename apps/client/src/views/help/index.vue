<template>
    <div class="help-container">
        <ul class="list x-flex col">
            <li v-for="(item, index) in list" :key="index">
                <p class="title">{{ item.title }}</p>
                <p class="content">{{ item.content }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    const layoutStore = useLayoutStore();
    layoutStore.title = '使用帮助';

    const list = ref([
        {
            title: '用户:座位如何预约?',
            content:
                '管理员: 用户关注“上海重大传染病和生物安全研究院”公众号后，在“研究院”一栏下点击“自习预约”。首先注册账号，根据要求提交姓名、学号、电话等个人信息，待管理员审批通过后即可登录。在座位预约模块选择预约使用时间和座位号，点击确认提交，即为预约。管理员审批通过后，即为预约成功，详见“我的预约”。',
        },
        {
            title: '用户:预约后如何使用?',
            content:
                '管理员: 用户预约成功后，需在规定时间内签到使用。签到时需到现场扫描座位上的专属二维码，并打开蓝牙。扫码成功后，约定时间内座位使用权归当前用户所有。用户使用过程中需要遵守相关管理规定以及系统的相关约定。如需暂时离开要点击“暂离”等等。',
        },
        {
            title: '用户: 违约会有哪些后果?',
            content:
                '管理员: 由于用户未规范使用座位导致资源浪费、管理难度增加等情况，累计达到违约3次，管理方将对用户采取相应处罚的措施。包括但不限于3天内禁止预约，暂停或永久用户使用权限等，请大家注意规范使用座位。',
        },
        {
            title: '用户: 签到时无法成功调用摄像头怎么办?',
            content:
                '管理员: 由于微信自带浏览器限制，部分手机型号无法在微信内调用摄像头。在签到时可选择点击右上角“···”，选择手机浏览器，在浏览器上登录账号并扫码签到。如果扫码显示模糊，则适当拉远距离，对焦好即可成功识别二维码。',
        },
    ]);
</script>

<style scoped lang="less">
    .help-container {
        padding: var(--gap);
        overflow: auto !important;
        .list {
            width: 100%;
            gap: var(--gap);
            li {
                width: 100%;
                padding: var(--gap);
                background: #fff;
                border-radius: 8px;
                font-size: 16px;
                color: #666e7d;
                line-height: 26px;
                .title {
                    font-weight: bold;
                    color: #323333;
                    line-height: 26px;
                }
            }
        }
    }
</style>
