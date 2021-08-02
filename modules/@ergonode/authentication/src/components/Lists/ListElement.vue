/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li class="list-element">
        <IconError
            v-if="!item.success && !item.value"
            :fill-color="redColor"
            width="20"
            height="20" />
        <IconSuccess
            v-else
            :fill-color="fillSuccessColor"
            width="20"
            height="20" />
        <span v-text="item.title" />
    </li>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ListElement',
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        fillSuccessColor() {
            return this.item.value ? this.greenColor : this.graphiteColor;
        },
        redColor() {
            return RED;
        },
        greenColor() {
            return GREEN;
        },
        graphiteColor() {
            return GRAPHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element {
        display: grid;
        justify-content: flex-start;
        grid-auto-flow: column;
        grid-column-gap: 10px;
        margin: 10px 0;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
    }
</style>
