/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        v-bind="$attrs"
        :style="{ transform: arrowStyle.transform }">
        <path
            :d="lowerArrow.drawingCommands"
            :fill="arrowStyle.color" />
        <path
            :d="upperArrow.drawingCommands"
            :fill="upperArrow.fillColor" />
    </Icon>
</template>

<script>
import {
    SORTING_ORDER,
} from '@Core/defaults/icons';
import {
    GREEN,
    GREY,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'IconArrowSort',
    inheritAttrs: false,
    computed: {
        lowerArrow() {
            return {
                drawingCommands: 'M8 14L12 18L16 14H8Z',
            };
        },
        upperArrow() {
            return {
                drawingCommands: 'M16 10L12 6L8 10L16 10Z',
                fillColor: this.$attrs.order !== null ? GREY : null,
            };
        },
        arrowStyle() {
            switch (this.$attrs.order) {
            case SORTING_ORDER.ASC:
                return {
                    transform: 'rotate(180deg)',
                    color: GREEN,
                };
            case SORTING_ORDER.DESC:
                return {
                    transform: 'rotate(0)',
                    color: GREEN,
                };
            default:
                return {
                    transform: 'rotate(0)',
                    color: null,
                };
            }
        },
    },
};
</script>
