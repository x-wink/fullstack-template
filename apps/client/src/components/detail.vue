<template>
    <transition :duration="200" name="slide">
        <div v-if="detail && visible" class="popup">
            <img alt="close" class="close-btn" src="@/assets/close.png" @click="handleClose" />
            <div class="name">{{ props.detail!.name }}</div>
            <div v-if="props.detail!.time" class="time flex col-center">
                <img alt="time" src="@/assets/time.png" />
                <div>{{ props.detail!.time }}</div>
            </div>
            <div class="address flex col-center">
                <img alt="address" src="@/assets/address.png" />
                <div>{{ props.detail!.address }}</div>
            </div>
            <div class="go flex row-center col-center" @click="handleMap">
                <img alt="go" src="@/assets/go.png" />
                <div>路线指引</div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import { eventBus } from '@/utils';
    import { ref, watch } from 'vue';

    const props = defineProps<{
        detail?: {
            name: string;
            time: string;
            address: string;
        };
    }>();
    const visible = ref(true);
    watch(
        () => props.detail?.name,
        (value) => {
            visible.value = !!value;
        }
    );
    const emits = defineEmits<{
        (e: 'map', name: string): void;
        (e: 'close'): void;
    }>();
    const handleClose = () => {
        eventBus.emit('activePoint', '');
        visible.value = false;
        emits('close');
    };
    const handleMap = () => {
        emits('map', props.detail!.name);
    };
</script>

<style scoped lang="less">
    .slide-enter-active,
    .slide-leave-active,
    .slide-enter,
    .slide-leave-to {
        transform: translate(0, calc(100% + 20px));
    }
    .popup {
        transition: all 0.2s !important;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        width: calc(100% - 20px);
        max-width: calc(var(--max-width) - 20px);
        margin: 0 auto 10px;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 5px 0 var(--primary);

        .close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 36px;
            height: 36px;
        }

        .name {
            color: var(--primary);
            font-weight: bolder;
            font-size: 1.5em;
        }

        .time {
            margin-top: 10px;
            color: var(--error);

            img {
                width: 20px;
                margin-right: 10px;
            }
        }

        .address {
            margin-top: 10px;
            color: #000;

            img {
                width: 20px;
                margin-right: 10px;
                transform: scale(0.8);
            }
        }

        .go {
            margin-top: 10px;
            color: var(--info);

            img {
                width: 30px;
                margin-right: 10px;
            }
        }
    }
</style>
