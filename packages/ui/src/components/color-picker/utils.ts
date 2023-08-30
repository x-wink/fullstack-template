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
    ctx.getContextAttributes().willReadFrequently = true;

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
    ctx.getContextAttributes().willReadFrequently = true;
    x = Math.min(cvs.width - 0.1, x);
    y = Math.min(cvs.height - 0.1, y);
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;

    const r = data[0];
    const g = data[1];
    const b = data[2];
    return { r, g, b };
};
export const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } as RGB;
};
export const rgbaToHex = (color: RGBA | RGB) => {
    const componentToHex = (c: number): string => (~~c).toString(16).padStart(2, '0');

    const hexR = componentToHex(color.r);
    const hexG = componentToHex(color.g);
    const hexB = componentToHex(color.b);
    const hexA = componentToHex(((color as RGBA).a ?? 1) * 255);

    return `#${hexR}${hexG}${hexB}${hexA}`;
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
