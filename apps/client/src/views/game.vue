<template>
    <ul class="game-list">
        <li v-for="(item, index) in list" :key="index" class="game-item flex col row-center col-center">
            <div class="img">
                <img src="/favicon.ico" />
            </div>
            <p class="name">{{ item.name }}</p>
            <p class="code">{{ item.code }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
    const list = ref([
        {
            name: '俄罗斯方块',
            code: 'RussiaBlock',
        },
        {
            name: '五子棋',
            code: 'Backgammon',
        },
    ]);
</script>

<style scoped lang="less">
    .game-list {
        --size: 100px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--size), 1fr));
        grid-template-rows: repeat(auto-fill, minmax(var(--size), 1fr));
        gap: 20px;
        .game-item {
            padding: var(--x-space);
            border: 1px solid var(--x-primary);
            border-radius: var(--x-border-radius);
            white-space: nowrap;
            .img {
                width: 80%;
                aspect-ratio: 1;
                object-fit: contain;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
