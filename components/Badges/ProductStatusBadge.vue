/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InformationBadge
        :background="status.color"
        :color="textColor"
        :title="status.name || status.code" />
</template>

<script>
import {
    hexToRGB, calculateRelativeLuminance, calculateContrastRatio,
} from '~/model/color/ColorContrast';
import { WHITE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'ProductStatusBadge',
    components: {
        InformationBadge: () => import('~/core/components/Badges/InformationBadge'),
    },
    props: {
        status: {
            type: Object,
            required: true,
        },
    },
    computed: {
        textColor() {
            const convertedRgbText = hexToRGB(WHITE);
            const convertedRgbBg = hexToRGB(this.status.color);
            const relativeLuminance = calculateRelativeLuminance(convertedRgbText);
            const relativeLuminanceBackground = calculateRelativeLuminance(convertedRgbBg);
            const contrastRatio = calculateContrastRatio(
                relativeLuminance,
                relativeLuminanceBackground,
            );

            return contrastRatio > 4.5 ? WHITE : GRAPHITE_DARK;
        },
    },
};
</script>
