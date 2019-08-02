/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        class="sort-icon"
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <polygon
            class="upper-arrow"
            :fill="lowerArrowFill"
            :points="lowerArrow.points" />
        <polygon
            class="lower-arrow"
            :points="upperArrow.points"
            :fill="upperArrowFill"
            :transform="upperArrow.transform" />
    </IconBase>
</template>

<script>
import { SortingOrder } from '~/model/icons/SortingOrder';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconArrowSort',
    components: {
        IconBase,
    },
    props: {
        sortingOrder: {
            type: String,
            default: SortingOrder.NONE,
        },
        fillColor: {
            type: String,
            default: '#5C5F65',
        },
        size: {
            type: [String, Number],
            default: '24',
        },
    },
    data() {
        return {
            lowerArrow: {
                points: '8 14 12 18 16 14',
                fillColor: null,
            },
            upperArrow: {
                points: '8 6 12 10 16 6',
                transform: 'translate(12, 8) rotate(-180) translate(-12, -8)',
                fillColor: null,
            },
        };
    },
    computed: {
        upperArrowFill() {
            switch (this.sortingOrder) {
            case SortingOrder.ASC:
                return '#D6D7D8';
            case SortingOrder.DESC:
                return '#85878B';
            default:
                return null;
            }
        },
        lowerArrowFill() {
            switch (this.sortingOrder) {
            case SortingOrder.ASC:
                return '#85878B';
            case SortingOrder.DESC:
                return '#D6D7D8';
            default:
                return null;
            }
        },
    },
};
</script>
