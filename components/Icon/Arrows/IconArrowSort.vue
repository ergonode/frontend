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
import { SORTING_ORDER } from '~/defaults/icons';
import { GRAPHITE, GREY, GREEN } from '~/assets/scss/_variables/_colors.scss';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconArrowSort',
    components: {
        IconBase,
    },
    props: {
        sortingOrder: {
            type: String,
            default: SORTING_ORDER.NONE,
        },
        fillColor: {
            type: String,
            default: GRAPHITE,
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
            case SORTING_ORDER.ASC:
                return GREY;
            case SORTING_ORDER.DESC:
                return GREEN;
            default:
                return null;
            }
        },
        lowerArrowFill() {
            switch (this.sortingOrder) {
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
