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
        const whiteColorRelativeLuminance = 0.9982138681756572;
        const badgeRGB = hexToRGB(this.$options.propsData.value.color);
        const relativeLuminance = calculateRelativeLuminance(badgeRGB);
        const contrastRatio = calculateContrastRatio(
            whiteColorRelativeLuminance, relativeLuminance,
        );

        this.color = contrastRatio > 4.5 ? '#fff' : '#000';
    },
    beforeDestroy() {
        delete this.color;
    },
};
</script>

<style lang="scss" scoped>
    .status-info-cell {
        @include setFont(medium, small, regular);

        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 4px;

        &__block {
            border-radius: 7px;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            padding: 8px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>
