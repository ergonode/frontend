/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="localValue"
        solid
        regular
        :label="$attrs.title"
        :options="$attrs.enum_titles"
        :error-messages="$attrs.errorMessage"
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
    created() {
        console.log(this.$attrs);
        this.localValue = this.$attrs.default;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;
            this.$emit('input', value);
        },
    },
};
</script>
