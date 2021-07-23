/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :value="value"
        :required="true"
        :clearable="true"
        :size="smallSize"
        :label="parameter.name"
        :disabled="disabled"
        :options="options"
        :error-messages="errorMessages"
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
                affectedBy = '',
            } = this.parameter;

            let options = this.parameter.options || {};

            if (affectedBy) {
                if (this.value[affectedBy]) {
                    const affectedByValue = this.value[affectedBy];

                    if (complexOptions[affectedByValue.id]) {
                        options = complexOptions[affectedByValue.id];
                    }
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
