<template>
    <!-- 组件效果会根据canvas的样式进行变化，如背景颜色，字体，颜色 -->
    <canvas ref="refsCanvas" class="x-code-rain" :class="{ '--background': props.background }"></canvas>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted } from 'vue';
    import { ref } from 'vue';
    const props = withDefaults(
        defineProps<{
            /**
             * 随机字符集
             */
            charset?: string;
            /**
             * 下落间隔时间（毫秒）
             */
            step?: number;
            /**
             * 密集程度，数字越小下落越密集
             */
            density?: number;
            /**
             * 是否作为背景
             */
            background?: boolean;
            /**
             * 雨滴长度
             */
            length?: number;
        }>(),
        {
            charset: 'qwertyuiopasdfghjklzxcvbnm0123456789',
            step: 100,
            density: 15,
            length: 15,
        }
    );
    const refsCanvas = ref<HTMLCanvasElement>();
    const init = () => {
        const cvs = refsCanvas.value;
        const ctx = cvs?.getContext('2d');
        if (!cvs || !ctx) {
            throw new Error('初始化画布失败');
        }
        const ratio = devicePixelRatio ?? 1;
        cvs.width = cvs.clientWidth * ratio;
        cvs.height = cvs.clientHeight * ratio;
        const style = getComputedStyle(cvs);
        ctx.font = style.font;
        const fontSize = Number(style.fontSize.replace('px', '')) * 1.2;
        const cols = ~~(cvs.width / fontSize);
        return { cvs, ctx, fontSize, backgroundColor: style.backgroundColor, color: style.color, cols };
    };
    const randomInt = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
    const randomChar = () => props.charset[randomInt(0, props.charset.length - 1)];
    let cancelId = 0;
    let data = [] as string[][];
    let position = [] as number[];
    onMounted(() => {
        let { cvs, ctx, backgroundColor, color, fontSize, cols } = init();
        const update = () => {
            const res = init();
            backgroundColor = res.backgroundColor;
            color = res.color;
            fontSize = res.fontSize;
            cols = res.cols;
            while (data.length < cols) {
                data.push([]);
                position.push(randomInt(-props.length, 0));
            }
            window.addEventListener('resize', update, { once: true });
        };
        window.addEventListener('resize', update, { once: true });
        data = Array.from({ length: cols }, () =>
            Array.from({ length: randomInt(0, props.length) }, () => randomChar())
        );
        position = Array.from({ length: cols }, () => randomInt(-props.length, props.length));
        let lasttime = 0;
        const render = (time = 0) => {
            cancelId = requestAnimationFrame(render);
            if (time - lasttime > props.step) {
                lasttime = time;

                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, cvs.width, cvs.height);

                ctx.fillStyle = color;
                ctx.textAlign = 'center';
                for (let i = 0; i < cols; i++) {
                    position[i]++;
                    const col = data[i];
                    if (col.length === props.length) {
                        col.shift();
                    }
                    const char = props.charset[randomInt(0, props.charset.length - 1)];
                    data[i].push(char);
                    for (let offset = 0, len = data[i].length; offset < len; offset++) {
                        ctx.globalAlpha = offset * (1 / props.length);
                        const x = i * fontSize,
                            y = (position[i] + offset) * fontSize;
                        ctx.fillText(data[i][offset], x, y);
                    }
                    if (position[i] * fontSize > cvs.height && randomInt(1, props.density) > props.density / 2) {
                        data[i] = Array.from({ length: randomInt(0, props.length) }, () => randomChar());
                        position[i] = randomInt(-data[i].length, 0);
                    }
                }
            }
        };
        render();
    });
    onUnmounted(() => {
        cancelAnimationFrame(cancelId);
    });
</script>

<style lang="less">
    .x-code-rain {
        width: 100%;
        height: 100%;
        font-size: 1em;
        font-family: '微软雅黑';
        color: #0f0;
        background-color: #000000;
        &.--background {
            pointer-events: none;
            position: absolute;
            z-index: 0;
            left: 0;
            top: 0;
        }
    }
</style>
