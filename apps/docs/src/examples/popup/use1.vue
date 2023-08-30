<template>
    <div class="x-flex">
        <XPopup v-model="visible" static>普通浮层</XPopup>
        <XPopup v-model="visible" arrow static style="margin-left: var(--x-space)">带有箭头</XPopup>
    </div>
</template>
<script setup lang="ts">
    import { XPopup } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
