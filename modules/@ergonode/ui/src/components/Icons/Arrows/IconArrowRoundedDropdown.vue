/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        v-bind="$attrs"
        :style="iconTransform">
        <circle
            :cx="radius"
            :cy="radius"
            :r="normalizedRadius"
            :stroke-width="strokeWidth"
            :fill="white"
            :stroke="grey" />
        <path
            :style="arrowTransform"
            :d="drawingCommands" />
    </Icon>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    GREY,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'IconArrowRoundedDropdown',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M15.5163 8.875L11.5 12.8825L7.48375 8.875L6.25 10.1087L11.5 15.3587L16.75 10.1087L15.5163 8.875Z';
        },
        strokeWidth() {
            return 1;
        },
        radius() {
            return 12;
        },
        normalizedRadius() {
            return this.radius - (this.strokeWidth * 2);
        },
        white() {
            return WHITE;
        },
        grey() {
            return GREY;
        },
        iconTransform() {
            if (this.$attrs.state === ARROW.UP) {
                return {
                    transform: 'rotate(-180deg)',
                };
            }

            return null;
        },
        arrowTransform() {
            return {
                transform: `translate(${this.strokeWidth / 2}px, ${this.strokeWidth / 2}px)`,
            };
        },
    },
};
</script>
