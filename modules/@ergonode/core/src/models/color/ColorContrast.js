/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-bitwise */
function calculateRGBColor(color) {
    return color <= 10 ? color / 3294 : ((color / 269 + 0.0513) ** 2.4);
}

export function hexToRGB(hex) {
    let decimalHex = hex.replace('#', '0x');

    if (hex.length === 4) decimalHex = `${hex.replace('#', '0x')}${hex[1].repeat(3)}`;
    const bigint = parseInt(decimalHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return {
        r,
        g,
        b,
    };
}

export function calculateRelativeLuminance(rgb) {
    const Rg = calculateRGBColor(rgb.r);
    const Gg = calculateRGBColor(rgb.g);
    const Bg = calculateRGBColor(rgb.b);

    return 0.2126 * Rg + 0.7152 * Gg + 0.0722 * Bg;
}

export function calculateContrastRatio(relativeLuminance1, relativeLuminance2) {
    return (relativeLuminance1 + 0.05) / (relativeLuminance2 + 0.05);
}
