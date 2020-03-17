/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditTextBaseCell :style="{width: `${fixedWidth + 8}px` }">
        <TextArea
            :style="{height: '134px'}"
            :value="value"
            :autofocus="true"
            :left-alignment="true"
            :error-messages="errorMessages"
            resize="none"
            @input="onValueChange" />
    </GridEditTextBaseCell>
</template>

<script>
export default {
    name: 'GridEditLongTextCell',
    components: {
        GridEditTextBaseCell: () => import('@Core/components/Grid/EditCells/Base/GridEditTextBaseCell'),
        TextArea: () => import('@Core/components/Inputs/TextArea'),
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
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
