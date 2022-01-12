/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="value"
        :required="true"
        :multiselect="true"
        :clearable="true"
        :size="smallSize"
        :label="parameter.name"
        :disabled="disabled"
        :options="options"
        :error-messages="errorMessages"
        option-key="key"
        option-value="value"
        @input="onValueChange" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ConditionSetTreeDesignerMultiSelectItemParameter',
    props: {
        parameter: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            default: () => [],
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
        options() {
            const {
                complexOptions = {},
            } = this.parameter;

            let options = this.parameter.options || {};

            if (this.affectedBy) {
                if (complexOptions[this.affectedBy.id]) {
                    options = complexOptions[this.affectedBy.id];
                }
            }

            return Object.keys(options).map(key => ({
                id: key,
                key,
                value: options[key],
            }));
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
