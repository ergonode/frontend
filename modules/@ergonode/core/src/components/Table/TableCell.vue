/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <td
        v-if="header"
        class="table-cell table-cell--header">
        <span
            v-if="value"
            class="table-cell__value"
            v-text="value" />
    </td>
    <td
        v-else
        class="table-cell">
        <slot name="value">
            <span
                v-if="value"
                class="table-cell__value"
                v-text="value" />
        </slot>
    </td>
</template>

<script>
export default {
    name: 'TableCell',
    props: {
        value: {
            type: String,
            default: '',
        },
        header: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .table-cell {
        border: 1px solid $GREY;
        padding: 12px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        text-align: left;
        white-space: pre-wrap;

        &--header {
            background-color: $WHITESMOKE;
            font: $FONT_SEMI_BOLD_12_16;

            &::first-letter {
                text-transform: uppercase;
            }
        }

        &__value {
            text-align: left;
        }
    }
</style>
