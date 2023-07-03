<template>
    <div class="canvas-container">
        <div class="flex col col-center form">
            <div class="form-item">
                <label for="#index">SVG图片</label>
                <input id="index" v-model="index" :max="shapes.children.length - 1" :min="0" type="range" />
            </div>
            <div class="form-item">
                <label for="#rotate">旋转角度</label>
                <input id="rotate" v-model="svg.rotation" :max="360" :min="0" type="range" />
            </div>
        </div>
        <canvas id="cvs"></canvas>
    </div>
</template>

<script setup lang="ts">
    import pic from '@/assets/test.png';
    import svg1 from '@/assets/1.svg?raw';
    import svg2 from '@/assets/2.svg?raw';
    import svg3 from '@/assets/3.svg?raw';
    const shapes = reactive({
        image: {
            src: pic,
        },
        children: [
            {
                svg: svg1,
                width: 132,
                height: 151,
                rotation: 90,
            },
            {
                svg: svg2,
                width: 211,
                height: 150,
                rotation: 45,
            },
            {
                svg: svg3,
                width: 603.6,
                height: 133,
                rotation: 21,
            },
        ],
    });
    const index = ref(2);
    const svg = computed(() => shapes.children[index.value]);

    const createTransformMatrix = (angle = 0, scaleX = 1, scaleY = 1, flipHorizontal = false, flipVertical = false) => {
        angle = (angle * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const a = scaleX * cos * (flipHorizontal ? -1 : 1);
        const b = scaleX * sin;
        const c = scaleY * -sin;
        const d = scaleY * cos * (flipVertical ? -1 : 1);
        const e = 0;
        const f = 0;
        return [a, b, c, d, e, f] as const;
    };
    const getTransformedSize = (width: number, height: number, angle: number): { width: number; height: number } => {
        angle = (angle * Math.PI) / 180;
        const transformedWidth = Math.abs(width * Math.cos(angle)) + Math.abs(height * Math.sin(angle));
        const transformedHeight = Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));
        return { width: transformedWidth, height: transformedHeight };
    };
    const loadImage = (src: string, width?: number, height?: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
            const img = new Image(width, height);
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img);
            img.crossOrigin = 'anonymous';
            img.decoding = 'sync';
            img.src = src;
        });
    };

    onMounted(async () => {
        const cvs = document.getElementById('cvs') as HTMLCanvasElement;
        const ctx = cvs.getContext('2d')!;
        watch(
            svg,
            async () => {
                const { width, height, rotation, svg: xml } = svg.value;
                const { width: w, height: h } = getTransformedSize(width, height, rotation);
                cvs.width = w;
                cvs.height = h;
                ctx.clearRect(0, 0, cvs.width, cvs.height);

                const [centerX, centerY] = [cvs.width / 2, cvs.height / 2];
                ctx.translate(centerX, centerY);
                ctx.transform(...createTransformMatrix(rotation));
                ctx.translate(-centerX, -centerY);

                const img = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`);
                ctx.drawImage(img, (width - w) / -2, (h - height) / 2, width, height);
            },
            {
                immediate: true,
                deep: true,
            }
        );
    });
</script>

<style scoped lang="less">
    .canvas-container {
        canvas {
            background: #ffff;
            margin: auto;
        }
        .form {
            margin-bottom: auto;
            font-size: 1.2em;
            label {
                margin-right: 20px;
            }
            input {
                text-align: center;
                font-size: 1.2em;
                width: 100px;
            }
        }
    }
</style>
