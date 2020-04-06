/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTextEditContentCell :style="{width: `${fixedWidth + 8}px`}">
        <TextField
            :value="value"
            :autofocus="true"
            :left-alignment="true"
            :input="inputType"
            :error-messages="errorMessages"
            small
            @input="onValueChange" />
    </GridTextEditContentCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';

export default {
    name: 'GridEditShortTextCell',
    components: {
        GridTextEditContentCell,
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        fixedWidth: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    computed: {
        inputType() {
            return this.type === 'NUMERIC'
                ? { type: 'number' }
                : { type: 'text' };
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', this.type === 'NUMERIC' ? +value : value);
        },
    },
};
</script>
