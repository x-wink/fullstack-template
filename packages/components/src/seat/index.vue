<template>
    <div
        ref="refsContainer"
        class="seat-container x-flex col"
        :class="{ dark: props.dark, 'allow-overflow': props.allowOverflow }"
    >
        <div class="legend x-flex">
            <label class="x-flex col-center">
                <div class="seat"></div>
                <span>可选</span>
            </label>
            <label class="x-flex col-center">
                <div class="seat picked"></div>
                <span>选中</span>
            </label>
            <label class="x-flex col-center">
                <div class="seat selected"></div>
                <span>已选</span>
            </label>
            <label class="x-flex col-center">
                <div class="seat leaved"></div>
                <span>暂离</span>
            </label>
        </div>
        <div class="main fill x-flex col">
            <div
                v-for="(_, y) in data.row"
                :key="y"
                class="row x-flex row-center"
                :style="{ order: calcVerticalOrder(y) }"
            >
                <div
                    v-for="(__, x) in data.col"
                    :key="x"
                    class="seat x-flex row-center col-center"
                    :class="{
                        picked: modelValue.includes(calcSeatNo(x, y)),
                        selected: props.selected?.includes(calcSeatNo(x, y)),
                        leaved: props.leaved?.includes(calcSeatNo(x, y)),
                        white: calcSeatNo(x, y) === calcPrevNo(x, y),
                    }"
                    :style="{ order: calcHorizontalOrder(x) }"
                    @click="handlePick(calcSeatNo(x, y))"
                >
                    <span>
                        {{ getSeatLabel(x, y) }}
                    </span>
                </div>
            </div>
            <div v-for="(item, index) in horizontalSplits" :key="index" class="split" :style="calcSplitStyle(item)">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import type { SeatConfig, SeatSplit } from '../index';
    const props = defineProps<{
        config: SeatConfig;
        multipart?: boolean;
        selected?: number[];
        leaved?: number[];
        dark?: boolean;
        allowOverflow?: boolean;
        formatSeatNo?: (no: number, x: number, y: number) => string | undefined;
    }>();

    const refsContainer = ref<HTMLElement>();

    const data = computed(() => props.config);
    const calcVerticalOrder = (y: number) => {
        return (data.value.flipVertical ? data.value.row - y - 1 : y) * 10;
    };
    const calcHorizontalOrder = (x: number) => {
        return (data.value.flipHorizontal ? data.value.col - x - 1 : x) * 10;
    };
    const calcSeatNo = (x: number, y: number) => {
        const no = y * data.value.col + x + 1;
        const skip = data.value.skip?.filter((item) => item <= no) ?? [];
        const white = data.value.white?.filter((item) => item <= no) ?? [];
        return no + skip.length - white.length;
    };
    const calcPrevNo = (x: number, y: number) => {
        if (!x && !y) return -1;
        if (!x) {
            y--;
            x = data.value.col - 1;
        } else {
            x--;
        }
        return calcSeatNo(x, y);
    };

    const getSeatLabel = (x: number, y: number) => {
        const no = calcSeatNo(x, y);
        return props.formatSeatNo ? props.formatSeatNo(no, x, y) : no;
    };
    // TODO 支持垂直分割和座位分割
    const horizontalSplits = computed(() => data.value.split?.filter((item) => item.type === 'horizontal') ?? []);
    const calcSplitStyle = (item: SeatSplit) => {
        return {
            width: (item.width / data.value.col) * 100 + '%',
            height: (item.height / data.value.row) * 100 + '%',
            order: calcVerticalOrder(item.location),
        };
    };

    const modelValue = defineModel<number[]>({ required: false, default: () => [] });
    const handlePick = (no: number) => {
        if (props.allowOverflow || !props.selected?.includes(no)) {
            if (props.multipart) {
                modelValue.value.push(no);
            } else {
                modelValue.value = [no];
            }
        }
    };
</script>

<style scoped lang="less">
    .seat-container {
        --gap: 10px;
        --gap-mini: 3px;
        --gap-super: 30px;
        --size: 30px;
        --fc: #000;
        --bgc: #fff;
        width: fit-content;
        height: fit-content;
        max-width: 100%;
        max-height: 100%;
        gap: var(--gap);
        color: var(--fc);
        background: var(--bgc);
        padding: var(--gap-super);
        overflow: hidden;
        &.dark {
            --fc: #fff;
            --bgc: #000;
            .seat {
                &.picked {
                    color: var(--bgc);
                }
                &.selected {
                    color: var(--fc);
                }
            }
        }
        &.allow-overflow {
            .seat.selected {
                cursor: pointer;
            }
        }
        .legend {
            --size: 20px;
            gap: var(--gap);
            font-size: 12px;
            margin: var(--gap) auto;
            label {
                gap: var(--gap-mini);
            }
        }
        .seat {
            width: var(--size);
            height: var(--size);
            font-size: 12px;
            border: 1px solid #909399;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            cursor: pointer;
            &.picked {
                color: var(--fc);
                border-color: #ddd;
                background-color: #ddd;
            }
            &.selected {
                color: var(--bgc);
                border-color: #2a3b96;
                background-color: #2a3b96;
                cursor: not-allowed;
            }
            &.leaved {
                border-color: #bc2b28;
                background-color: #bc2b28;
            }
            &.white {
                opacity: 0;
                pointer-events: none;
            }
        }
        .main {
            gap: var(--gap);
            overflow: auto;
            .row {
                gap: var(--gap);
            }
            .split {
                text-align: center;
            }
        }
    }
</style>
