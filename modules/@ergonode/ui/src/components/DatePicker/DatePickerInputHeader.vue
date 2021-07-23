/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input-header">
        <span v-text="title" />
        <TextField
            :value="value"
            :placeholder="dateFormat"
            :size="smallSize"
            :type="underlineInputType"
            :alignment="centerAlignment"
            @input="onValueChange" />
    </div>
</template>

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';

export default {
    name: 'DatePickerInputHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        centerAlignment() {
            return ALIGNMENT.CENTER;
        },
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        dateFormat() {
            return DEFAULT_FORMAT;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-header {
        display: grid;
        grid-template-columns: auto 80px;
        grid-auto-flow: column;
        justify-content: center;
        align-items: center;
        column-gap: 8px;
        color: $GRAPHITE;
        font: $FONT_MEDIUM_12_16;
    }
</style>
