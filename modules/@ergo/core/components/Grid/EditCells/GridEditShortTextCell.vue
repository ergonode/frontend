/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditTextBaseCell :style="{width: `${fixedWidth + 8}px`}">
        <TextField
            :value="value"
            :autofocus="true"
            :left-alignment="true"
            :input="inputType"
            :error-messages="errorMessages"
            small
            @input="onValueChange" />
    </GridEditTextBaseCell>
</template>

<script>

export default {
    name: 'GridEditShortTextCell',
    components: {
        GridEditTextBaseCell: () => import('@Core/components/Grid/EditCells/Base/GridEditTextBaseCell'),
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
