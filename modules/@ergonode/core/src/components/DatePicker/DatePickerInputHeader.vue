/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input-header">
        <span v-text="header" />
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
import TextField from '@Core/components/TextField/TextField';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';

export default {
    name: 'DatePickerInputHeader',
    components: {
        TextField,
    },
    props: {
        header: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
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
