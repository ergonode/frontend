/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="value"
        :required="true"
        :clearable="true"
        :size="smallSize"
        :label="parameter.name"
        :disabled="disabled"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ConditionSetTreeDesignerTextItemParameter',
    props: {
        parameter: {
            type: Object,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
        affectedBy: {
            type: Object,
            default: null,
        },
        errorMessages: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
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
