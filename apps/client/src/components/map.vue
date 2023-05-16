<template>
    <div v-show="props.modelValue" class="map flex col row-center col-center" @click="handleClose">
        <div class="box">
            <img v-if="isMap2" alt="map" class="main" :src="loadAssets(props.target + '.png')" @click.stop />
            <template v-else>
                <img alt="map" class="main" src="@/assets/map.png" @click.stop />
                <div
                    v-for="(item, index) in map1"
                    :key="index"
                    class="name flex row-center col-center"
                    :style="{
                    left:item.mapOffset![0],
                    top:item.mapOffset![1]
                }"
                >
                    <img
                        :alt="item.name"
                        :src="loadAssets(item.name + (props.target === item.name ? '2.png' : '.png'))"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { loadAssets, points } from '@/utils';
    import { computed } from 'vue';
    const props = defineProps<{
        modelValue: boolean;
        target: string;
    }>();
    const emits = defineEmits(['update:modelValue']);
    const handleClose = () => {
        emits('update:modelValue', false);
    };

    const map1 = points.filter((item) => item.map === 1);
    const map2 = points.filter((item) => item.map === 2);
    const isMap2 = computed(() => map2.findIndex((item) => item.name === props.target) !== -1);
</script>

<style scoped lang="less">
    .map {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        max-width: var(--max-width);
        margin: auto;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        .box {
            width: 90%;
            position: relative;
            .main {
                width: 100%;
            }
        }
        .name {
            width: 100%;
            height: 100%;
            position: absolute;
            transform: scale(0.5);
        }
    }
</style>
