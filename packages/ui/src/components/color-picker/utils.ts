export const createDragContainer = (container: HTMLElement, cb: (x: number, y: number) => void): void => {
    let isDragging = false;
    const startDrag = (event: MouseEvent) => {
        if (container.contains(event.target as HTMLElement)) {
            isDragging = true;
            drag(event);
        }
    };
    const drag = (event: MouseEvent) => {
        if (isDragging) {
            const containerRect = container.getBoundingClientRect();
            const x = event.clientX - containerRect.left;
            const y = event.clientY - containerRect.top;

            cb(Math.min(Math.max(x, 0), containerRect.width), Math.min(Math.max(y, 0), containerRect.height));
        }
    };
    const stopDrag = () => {
        isDragging = false;
    };
    window.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
};
export const getPosition = (cvs: HTMLCanvasElement, color: RGB) => {
    const ctx = cvs.getContext('2d')!;

    const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    const data = imageData.data;

    let closestDiff = Infinity;
    let x = -1;
    let y = -1;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const diff = colorDiff(color, { r, g, b });

        if (diff < closestDiff) {
            closestDiff = diff;
            x = (i / 4) % cvs.width;
            y = Math.floor(i / (4 * cvs.width));
        }
    }
    return [x, y];
};
export const parseCSSColor = (color: string) => {
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
    document.body.appendChild(tempElement);

    const computedColor = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    const rgbaMatch = computedColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/i)!;
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
    return { r, g, b, a } as RGBA;
};
export const getColor = (cvs: HTMLCanvasElement, x: number, y: number) => {
    const ctx = cvs.getContext('2d')!;
    x = Math.min(cvs.width - 0.1, x);
    y = Math.min(cvs.height - 0.1, y);
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;

    const r = data[0];
    const g = data[1];
    const b = data[2];
    return { r, g, b };
};
export const hexToRgba = (hex: string) => {
    hex = hex.replace('#', '');
    const colorValues = hex.match(/[0-9a-fA-F]{2}|[0-9a-fA-F]{1}/g);

    if (!colorValues) {
        throw new Error('Invalid hex color');
    }

    const r = parseInt(colorValues[0], 16);
    const g = parseInt(colorValues[1], 16);
    const b = parseInt(colorValues[2], 16);
    const a = parseInt(colorValues[3] ?? 'ff', 16) / 255;

    return { r, g, b, a };
};
export const rgbaToHex = (color: RGBA | RGB) => {
    const componentToHex = (c: number): string => (~~c).toString(16).padStart(2, '0');

    const hexR = componentToHex(color.r);
    const hexG = componentToHex(color.g);
    const hexB = componentToHex(color.b);
    const hexA = componentToHex(((color as RGBA).a ?? 1) * 255);

    return `#${hexR}${hexG}${hexB}${hexA}`;
};
export const color2Hue = (hex: string) => {
    const rgb = hexToRgba(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hue = 0;
    if (max !== min) {
        const delta = max - min;
        const deltaR = ((max - r) / 6 + delta / 2) / delta;
        const deltaG = ((max - g) / 6 + delta / 2) / delta;
        const deltaB = ((max - b) / 6 + delta / 2) / delta;

        if (r === max) {
            hue = deltaB - deltaG;
        } else if (g === max) {
            hue = 1 / 3 + deltaR - deltaB;
        } else if (b === max) {
            hue = 2 / 3 + deltaG - deltaR;
        }

        if (hue < 0) {
            hue += 1;
        } else if (hue > 1) {
            hue -= 1;
        }
    }

    return limitPrecision(hue);
};
export const hue2Color = (hue: number) => {
    hue = Math.max(0, Math.min(1, hue));
    if (hue === 1) {
        hue -= 0.01;
    }
    const segment = Math.floor(hue * 6);
    const position = hue * 6 - segment;
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'];
    const startColor = colors[segment];
    const endColor = colors[segment + 1];
    const startRGB = hexToRgba(startColor);
    const endRGB = hexToRgba(endColor);
    const r = startRGB.r + (endRGB.r - startRGB.r) * position;
    const g = startRGB.g + (endRGB.g - startRGB.g) * position;
    const b = startRGB.b + (endRGB.b - startRGB.b) * position;
    return { r, g, b } as RGB;
};
export const limitPrecision = (val: number, precision = 2) => {
    const p = 10 ** precision;
    return ~~(val * p) / p;
};
export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface RGBA extends RGB {
    a: number;
}
export const colorDiff = (color1: RGB, color2: RGB) => {
    const diffR = color1.r - color2.r;
    const diffG = color1.g - color2.g;
    const diffB = color1.b - color2.b;
    return Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);
};
