<template>
    <div class="x-flex">
        <XPopover v-model="visible" static>普通弹出层</XPopover>
        <XPopover v-model="visible" arrow static style="margin-left: var(--x-space)">带有箭头</XPopover>
    </div>
</template>
<script setup lang="ts">
    import { XPopover } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
