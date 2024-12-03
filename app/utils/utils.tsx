import React from "react";

const hexToRgb = (hex: string) => {
    hex = hex.replace('#', '');
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const isBright = (hex: string): boolean => {
    const { r, g, b } = hexToRgb(hex);
    return (r + g + b) / 3 > 128;
}

export const inverseColor = (hex: string): string => {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}

export const numbersTxt = (num: number, variations: [string, string, string]): string => {
    const past = num % 10;
    const first = Math.floor(num / 10) % 10;

    let text: string;
    if (past === 1 && !num.toString().endsWith('11')) {
        text = variations[0];  // голос
    } else if (past >= 2 && past <= 4 && first !== 1) {
        text = variations[1];  // голоса
    } else {
        text = variations[2];  // голосов
    }

    return text;
}

export const formatText = (string: string) => string.split('\n').map((el, id) => (<React.Fragment key={id}>{el}<br /></React.Fragment>));

export const removeTrailingPunctuation = (string: string) => string.replace(/[.,!?;:]+$/, '');