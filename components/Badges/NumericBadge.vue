/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['numeric-badge', `numeric-badge--${theme}`]">
        <span
            class="font--semi-bold-10-12"
            v-text="number" />
    </div>
</template>

<script>
import { THEME } from '~/defaults/theme';

export default {
    name: 'NumericBadge',
    props: {
        number: {
            type: Number,
            required: true,
        },
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: (value) => Object.values(THEME).indexOf(value) !== -1,
        },
    },
};
</script>

<style lang="scss" scoped>
    .numeric-badge {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 999px;

        &--transparent {
            border: $BORDER_1_GREY;
            background-color: $WHITE;
            color: $GRAPHITE_DARK;
        }

        &--primary {
            background-color: $GREEN;
            color: $WHITE;
        }
    }
</style>
