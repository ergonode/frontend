/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <polygon
            :fill="lowerArrowFill"
            :points="lowerArrow.points" />
        <polygon
            :points="upperArrow.points"
            :fill="upperArrowFill"
            :transform="upperArrow.transform" />
    </Icon>
</template>

<script>
import { SORTING_ORDER } from '@Core/defaults/icons';
import { GREY, GREEN } from '@Core/assets/scss/_js-variables/colors.scss';
import Icon from '@Core/components/Icons/Icon';

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
                fillColor: null,
            };
        },
        upperArrow() {
            return {
                points: '8 6 12 10 16 6',
                transform: 'translate(12, 8) rotate(-180) translate(-12, -8)',
                fillColor: null,
            };
        },
        upperArrowFill() {
            switch (this.$attrs.sortingOrder) {
            case SORTING_ORDER.ASC:
                return GREY;
            case SORTING_ORDER.DESC:
                return GREEN;
            default:
                return null;
            }
        },
        lowerArrowFill() {
            switch (this.$attrs.sortingOrder) {
            case SORTING_ORDER.ASC:
                return GREEN;
            case SORTING_ORDER.DESC:
                return GREY;
            default:
                return null;
            }
        },
    },
};
</script>
