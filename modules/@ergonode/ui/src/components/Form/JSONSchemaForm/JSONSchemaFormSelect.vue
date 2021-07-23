/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="localValue"
        :size="schema.size"
        :label="schema.title"
        :disabled="schema.disabled"
        :required="required"
        :options="schema.enum_titles || schema.enum"
        :hint="schema.description"
        :error-messages="errorMessages"
        :clearable="!schema.isRequired"
        @input="onValueChange" />
</template>

<script>

export default {
    name: 'JSONSchemaFormSelect',
    props: {
        /**
         * JSON schema
         */
        schema: {
            type: Object,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given field is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
    },
    data() {
        const {
            enum: options, enum_titles,
        } = this.schema;
        let localValue = '';

        if (!enum_titles) {
            localValue = this.value;
        } else {
            const optionIndex = options.findIndex(option => option === this.value);
            localValue = enum_titles[optionIndex];
        }

        return {
            localValue,
        };
    },
    computed: {
        mappedOptions() {
            if (!this.schema.enum_titles) return null;

            const {
                length,
            } = this.schema.enum;
            const mappedOptions = {};

            for (let i = 0; i < length; i += 1) {
                mappedOptions[this.schema.enum_titles[i]] = this.schema.enum[i];
            }

            return mappedOptions;
        },
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;

            this.$emit('input', this.mappedOptions ? this.mappedOptions[value] : value);
        },
    },
};
</script>
