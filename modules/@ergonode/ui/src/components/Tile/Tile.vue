/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tile">
        <span
            class="tile__label"
            v-text="label" />
        <span
            class="tile__value"
            v-text="value" />
    </div>
</template>

<script>
export default {
    name: 'Tile',
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .tile {
        display: flex;
        align-items: center;
        padding: 8px 10px;
        background-color: $WHITESMOKE;

        &__label {
            color: $GRAPHITE_DARK;
            font: $FONT_BOLD_12_16;
        }

        &__value {
            margin-left: 4px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
