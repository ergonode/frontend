/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="value"
        :required="true"
        :clearable="true"
        :input="{ type: 'number' }"
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
import TextField from '@UI/components/TextField/TextField';

export default {
    name: 'ConditionSetTreeDesignerNumericItemParameter',
    components: {
        TextField,
    },
    props: {
        parameter: {
            type: Object,
            required: true,
        },
        value: {
            type: [
                String,
                Number,
            ],
            default: '',
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
            this.$emit('input', +value);
        },
    },
};
</script>
