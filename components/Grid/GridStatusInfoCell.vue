/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="status-info-cell">
        <div
            class="status-info-cell__block"
            :style="{backgroundColor: value.color, color: color}">
            {{ value.label }}
        </div>
    </div>
</template>

<script>
import { hexToRGB, calculateRelativeLuminance, calculateContrastRatio } from '~/model/inputs/ColorContrast';

export default {
    name: 'GridStatusInfoCell',
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    beforeCreate() {
        const blackColorRelativeLuminance = 0;
        const colorRgb = hexToRGB(this.$options.propsData.value.color);
        const relativeLuminance = calculateRelativeLuminance(colorRgb);
        const contrastRatioWithBlackText = calculateContrastRatio(
            relativeLuminance, blackColorRelativeLuminance,
        );

        this.color = contrastRatioWithBlackText >= 4.5 ? '#000' : '#fff';
    },
    beforeDestroy() {
        delete this.color;
    },
};
</script>

<style lang="scss" scoped>
    .status-info-cell {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 4px;
        font: 500 12px/16px "Inter UI";

        &__block {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }
    }
</style>
