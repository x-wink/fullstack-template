<template>
    <!-- 组件效果会根据canvas的样式进行变化，如背景颜色，字体，颜色 -->
    <canvas ref="refsCanvas" class="x-code-rain"></canvas>
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
        }>(),
        {
            charset: 'qwertyuiopasdfghjklzxcvbnm0123456789',
            step: 10,
            density: 20,
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
        // 限制背景颜色透明度，不然没有渐隐效果
        const [r, g, b, a = '1'] = style.backgroundColor.match(/[\d\\.]+/g)!;
        const bgc = `rgba(${r},${g},${b},${Math.min(0.067, +a)})`;
        ctx.font = style.font;
        const fontSize = Number(style.fontSize.replace('px', ''));
        const cols = ~~(cvs.width / fontSize);
        return { cvs, ctx, fontSize, backgroundColor: bgc, color: style.color, cols };
    };
    const random = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
    let cancelId = 0;
    let position = [] as number[];
    onMounted(() => {
        let { cvs, ctx, backgroundColor, color, fontSize, cols } = init();
        const update = () => {
            const res = init();
            backgroundColor = res.backgroundColor;
            color = res.color;
            fontSize = res.fontSize;
            cols = res.cols;
            while (position.length < cols) {
                position.push(0);
            }
            window.addEventListener('resize', update, { once: true });
        };
        window.addEventListener('resize', update, { once: true });
        position = Array.from({ length: cols }, () => random(0, 100));
        let lasttime = 0;
        const render = (time = 0) => {
            cancelId = requestAnimationFrame(render);
            if (time - lasttime > props.step) {
                lasttime = time;
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                ctx.fillStyle = color;
                for (let i = 0; i < cols; i++) {
                    position[i]++;
                    const char = props.charset[random(0, props.charset.length - 1)];
                    const x = i * fontSize,
                        y = position[i] * fontSize;
                    ctx.fillText(char, x, y);
                    if (y > cvs.height && random(1, props.density) > props.density - 1) {
                        position[i] = 0;
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
        background-color: #00000011;
    }
</style>
