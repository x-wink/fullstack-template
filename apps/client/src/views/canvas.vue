<template>
    <div class="canvas-container"><canvas id="cvs"></canvas></div>
</template>

<script setup lang="ts">
    import pic from '@/assets/test.png';
    import svg1 from '@/assets/1.svg?raw';
    import svg2 from '@/assets/2.svg?raw';
    const shapes = {
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
        ],
    };
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
        const svg = shapes.children[1];
        const { width, height } = getTransformedSize(svg.width, svg.height, svg.rotation);
        cvs.width = width;
        cvs.height = height;
        const ctx = cvs.getContext('2d')!;

        const [centerX, centerY] = [cvs.width / 2, cvs.height / 2];
        ctx.translate(centerX, centerY);
        ctx.transform(...createTransformMatrix(svg.rotation));
        ctx.translate(-centerX, -centerY);

        const img = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.svg)}`);
        ctx.drawImage(img, (svg.width - width) / -2, (height - svg.height) / 2, svg.width, svg.height);
    });
</script>

<style scoped lang="less">
    .canvas-container {
        background: #000;
        canvas {
            background: white;
        }
    }
</style>
