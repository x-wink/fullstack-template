<template>
    <div class="game-controls" :style="style">
        <div class="directions">
            <template v-for="(item, index) in keys" :key="index">
                <button v-if="item" @click.stop="emits('press', item.key)" @touckstart="emits('press', item.key)">
                    {{ item.text }}
                </button>
                <span v-else></span>
            </template>
        </div>
        <div class="buttons">
            <button @click.stop="emits('press', 'stop')" @touchstart="emits('press', 'stop')">暂停</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Keys } from './core';

    const props = withDefaults(
        defineProps<{
            size?: number;
            position?: [string, string];
        }>(),
        {
            size: 100,
            position: () => ['1%', '80%'],
        }
    );
    const style = computed(() => ({ '--size': `${props.size}px`, left: props.position[0], top: props.position[1] }));

    const keys = [
        void 0,
        { key: 'up', text: '上' },
        void 0,
        { key: 'left', text: '左' },
        { key: 'ok', text: 'OK' },
        { key: 'right', text: '右' },
        void 0,
        { key: 'down', text: '下' },
        void 0,
    ] as const;

    const emits = defineEmits<{
        press: [key: Keys];
    }>();
</script>

<style scoped lang="less">
    .game-controls {
        position: absolute;

        .directions {
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
            padding: var(--x-space-mini);

            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }
        button {
            all: unset;
            border: 2px outset #fff8;
            border-radius: var(--x-border-radius);
            background: #fff4;
        }
    }
</style>
