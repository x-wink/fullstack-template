import { isClientSide, limitPrecision } from '.';

export const parseColor = (color: string) => {
    if (!isClientSide) {
        return { r: 0, g: 0, b: 0, a: 1 };
    }
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
export const hex2Rgba = (hex: string) => {
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
export const rgba2Hex = (color: RGBA | RGB) => {
    const componentToHex = (c: number): string => (~~c).toString(16).padStart(2, '0');

    const hexR = componentToHex(color.r);
    const hexG = componentToHex(color.g);
    const hexB = componentToHex(color.b);
    const hexA = componentToHex(((color as RGBA).a ?? 1) * 255);

    return `#${hexR}${hexG}${hexB}${hexA}`;
};
export const rgba2String = (color: RGBA | RGB) => {
    const { r, g, b } = color;
    const a = (color as RGBA).a ?? 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};
export const color2Hue = (hex: string) => {
    const rgb = hex2Rgba(hex);
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
    const startRGB = hex2Rgba(startColor);
    const endRGB = hex2Rgba(endColor);
    const r = startRGB.r + (endRGB.r - startRGB.r) * position;
    const g = startRGB.g + (endRGB.g - startRGB.g) * position;
    const b = startRGB.b + (endRGB.b - startRGB.b) * position;
    return { r, g, b } as RGB;
};
export const colorDiff = (color1: RGB, color2: RGB) => {
    const diffR = color1.r - color2.r;
    const diffG = color1.g - color2.g;
    const diffB = color1.b - color2.b;
    return Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);
};
export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface RGBA extends RGB {
    a: number;
}
