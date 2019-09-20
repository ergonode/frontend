/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="status-info-cell">
        <div
            class="status-info-cell__block"
            :style="{backgroundColor: color, color: txtColor}">
            {{ cellData.value }}
        </div>
    </div>
</template>

<script>
import { hexToRGB, calculateRelativeLuminance, calculateContrastRatio } from '~/model/inputs/ColorContrast';

export default {
    name: 'GridStatusInfoCell',
    props: {
        cellData: {
            type: Object,
            required: true,
        },
        colors: {
            type: Object,
            required: true,
        },
    },
    computed: {
        color() {
            return this.colors[this.cellData.key];
        },
        txtColor() {
            const whiteColorRelativeLuminance = 0.9982138681756572;
            const badgeRGB = hexToRGB(this.color);
            const relativeLuminance = calculateRelativeLuminance(badgeRGB);
            const contrastRatio = calculateContrastRatio(
                whiteColorRelativeLuminance, relativeLuminance,
            );

            return contrastRatio > 4.5 ? '#fff' : '#000';
        },
    },
};
</script>

<style lang="scss" scoped>
    .status-info-cell {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 4px;
        @include setFont(medium, small, regular);

        &__block {
            border-radius: 7px;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }
    }
</style>
