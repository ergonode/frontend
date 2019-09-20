/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GirdEditTextBaseCell :style="{width: `${fixedWidth + 8}px`}">
        <TextArea
            :value="value"
            :dismissible="false"
            :autofocus="true"
            :left-alignment="true"
            :error-messages="errorMessages"
            small
            resize="none"
            @focus="onFocusChange"
            @input="onValueChange" />
    </GirdEditTextBaseCell>
</template>

<script>
export default {
    name: 'GridEditLongTextCell',
    components: {
        GirdEditTextBaseCell: () => import('~/components/Grid/Base/GridEditTextBaseCell'),
        TextArea: () => import('~/components/Inputs/TextArea'),
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
        onFocusChange(focus) {
            this.$emit('focus', focus);
        },
    },
};
</script>
