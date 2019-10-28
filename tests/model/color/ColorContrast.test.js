/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    hexToRGB, calculateRelativeLuminance, calculateContrastRatio,
} from '~/model/color/ColorContrast';

describe('Color contrast conversion', () => {
    it('Hex is converted to RGB', () => {
        const hex = '#32a852';
        const rgb = {
            r: 50,
            g: 168,
            b: 82,
        };

        const convertedRGB = hexToRGB(hex);

        expect(convertedRGB).toStrictEqual(rgb);
    });

    it('Based on RGB calculate relative luminance', () => {
        const rgb = {
            r: 255,
            g: 255,
            b: 255,
        };

        const relativeLuminance = calculateRelativeLuminance(rgb);

        expect(relativeLuminance).toEqual(0.9982138681756572);
    });

    it('Given RGB color has good contrast on black color', () => {
        const textRgb = {
            r: 50,
            g: 168,
            b: 82,
        };
        const backgroundRgb = {
            r: 0,
            g: 0,
            b: 0,
        };
        const relativeLuminance = calculateRelativeLuminance(textRgb);
        const relativeLuminanceBackground = calculateRelativeLuminance(backgroundRgb);

        const contrastRatio = calculateContrastRatio(relativeLuminance, relativeLuminanceBackground);

        expect(contrastRatio).toBeGreaterThan(4.5);
    });
});
