<template>
    <!-- 组件效果会根据canvas的样式进行变化，如背景颜色，字体，颜色 -->
    <canvas ref="refsCanvas" class="x-rain" :class="{ '--background': props.background }"></canvas>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted } from 'vue';
    import { ref } from 'vue';
    defineOptions({
        name: 'XRain',
    });
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
            step: 67,
            density: 3000,
            length: 0,
        }
    );
    const refsCanvas = ref<HTMLCanvasElement>();
    const randomInt = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
    const randomChar = () => props.charset[randomInt(0, props.charset.length - 1)];
    let cancelId = 0;
    onMounted(() => {
        const cvs = refsCanvas.value!;
        const ctx = cvs!.getContext('2d')!;
        const style = getComputedStyle(cvs);
        const resolved = () => {
            const ratio = devicePixelRatio ?? 1;
            cvs.width = cvs.clientWidth * ratio;
            cvs.height = cvs.clientHeight * ratio;
            ctx.font = style.font;
            const fontSize = Number(style.fontSize.replace('px', '')) * 1.2;
            const cols = ~~(cvs.width / fontSize);
            const length = props.length || ~~((Math.min(window.innerHeight, cvs.height) / fontSize) * 0.66);
            const step = window.innerWidth < window.innerHeight ? props.step / 2 : props.step;
            const data = Array.from({ length: cols }, () =>
                Array.from({ length: randomInt(0, length) }, () => randomChar())
            );
            const position = Array.from({ length: cols }, () => randomInt(-length * 2, length * 2));
            return {
                cvs,
                ctx,
                fontSize,
                backgroundColor: style.backgroundColor,
                color: style.color,
                cols,
                length,
                step,
                data,
                position,
            };
        };
        let { backgroundColor, color, fontSize, cols, length, step, data, position } = resolved();
        const update = () => {
            try {
                const res = resolved();
                backgroundColor = res.backgroundColor;
                color = res.color;
                fontSize = res.fontSize;
                cols = res.cols;
                data = res.data;
                position = res.position;
            } catch (e) {
                // 画布不存在，不用处理
            }
        };
        new ResizeObserver(update).observe(refsCanvas.value!);
        new MutationObserver(() => {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(update, { timeout: 1000 });
            } else {
                setTimeout(update, 1000);
            }
        }).observe(refsCanvas.value!, { attributes: true, attributeFilter: ['style'] });

        let lasttime = 0;
        const render = (time = 0) => {
            cancelId = requestAnimationFrame(render);
            if (time - lasttime > step) {
                lasttime = time;

                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, cvs.width, cvs.height);

                ctx.fillStyle = color;
                ctx.textAlign = 'center';
                for (let i = 0; i < cols; i++) {
                    position[i]++;
                    const col = data[i];
                    if (col.length === length) {
                        col.shift();
                    }
                    const char = props.charset[randomInt(0, props.charset.length - 1)];
                    data[i].push(char);
                    for (let offset = 0, len = data[i].length; offset < len; offset++) {
                        ctx.globalAlpha = offset * (1 / length);
                        const x = i * fontSize,
                            y = (position[i] + offset) * fontSize;
                        ctx.fillText(data[i][offset], x, y);
                    }
                    if (
                        position[i] * fontSize > cvs.height &&
                        randomInt(1, props.density) < Math.min(50, props.density / 2)
                    ) {
                        data[i] = Array.from({ length: randomInt(0, length) }, () => randomChar());
                        position[i] = randomInt(-data[i].length * 2, 0);
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
    .x-rain {
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
