/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        v-bind="$attrs"
        :style="{ transform: arrowStyle.transform }">
        <polygon
            :fill="arrowStyle.color"
            :points="lowerArrow.points" />
        <polygon
            :points="upperArrow.points"
            :fill="upperArrow.fillColor"
            :transform="upperArrow.transform" />
    </Icon>
</template>

<script>
import {
    GREEN,
    GREY,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Icon from '@Core/components/Icons/Icon';
import {
    SORTING_ORDER,
} from '@Core/defaults/icons';

export default {
    name: 'IconArrowSort',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        lowerArrow() {
            return {
                points: '8 14 12 18 16 14',
            };
        },
        upperArrow() {
            return {
                points: '8 6 12 10 16 6',
                fillColor: this.$attrs.order !== null ? GREY : null,
                transform: 'translate(12, 8) rotate(-180) translate(-12, -8)',
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
