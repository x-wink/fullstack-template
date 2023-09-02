<template>
    <XInput v-model="value1" clearable type="number" />
    <br />
    <p>显示步进器</p>
    <XInput v-model="value2" clearable show-controls type="number" />
    <br />
    <p>指定步进值</p>
    <XInput v-model="value3" clearable show-controls step="10" type="number" />
    <br />
    <p>严格步进</p>
    <XInput v-model="value4" clearable show-controls step="10" stepStrictly type="number" />
    <br />
    <p>限制最大值、最小值</p>
    <XInput v-model="value5" clearable max="100" min="18" show-controls type="number" />
    <br />
    <p>限制精度</p>
    <XInput v-model="value6" clearable :precision="2" show-controls type="number" />
</template>
<script setup lang="ts">
    import { XInput } from '@pkgs/ui';
    import { ref } from 'vue';
    const value1 = ref(0);
    const value2 = ref(0);
    const value3 = ref(0);
    const value4 = ref(0);
    const value5 = ref(0);
    const value6 = ref(0);
</script>
