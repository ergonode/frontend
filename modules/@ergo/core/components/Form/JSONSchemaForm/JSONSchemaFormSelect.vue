/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="localValue"
        solid
        :regular="!$attrs.small"
        :small="$attrs.small"
        :label="$attrs.title"
        :required="$attrs.isRequired"
        :options="$attrs.enum_titles || $attrs.enum"
        :error-messages="$attrs.errorMessages"
        @input="onValueChange" />
</template>

<script>
import Select from '@Core/components/Inputs/Select/Select';

export default {
    name: 'JSONSchemaFormSelect',
    components: {
        Select,
    },
    inheritAttrs: false,
    data() {
        return {
            localValue: '',
        };
    },
    computed: {
        mappedOptions() {
            if (!this.$attrs.enum_titles) return null;

            const { length } = this.$attrs.enum;
            const mappedOptions = {};

            for (let i = 0; i < length; i += 1) {
                mappedOptions[this.$attrs.enum_titles[i]] = this.$attrs.enum[i];
            }

            return mappedOptions;
        },
    },
    created() {
        const { value, enum: options, enum_titles } = this.$attrs;

        if (!enum_titles) {
            this.localValue = value;
        } else {
            const optionIndex = options.findIndex(option => option === value);
            this.localValue = enum_titles[optionIndex];
        }
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;

            this.$emit('input', {
                key: this.$attrs.propKey,
                value: this.mappedOptions ? this.mappedOptions[value] : value,
            });
        },
    },
};
</script>
