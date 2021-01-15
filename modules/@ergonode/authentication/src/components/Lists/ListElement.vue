/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li class="list-element">
        <IconError
            v-if="!item.value"
            :fill-color="redColor"
            width="20"
            height="20" />
        <IconSuccess
            v-else
            :fill-color="greenColor"
            width="20"
            height="20" />
        <span v-text="item.title" />
    </li>
</template>

<script>
import {
    GREEN,
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconError from '@UI/components/Icons/Feedback/IconError';
import IconSuccess from '@UI/components/Icons/Feedback/IconSuccess';

export default {
    name: 'ListElement',
    components: {
        IconError,
        IconSuccess,
    },
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        redColor() {
            return RED;
        },
        greenColor() {
            return GREEN;
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
