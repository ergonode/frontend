/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="localValue"
        solid
        regular
        :label="title"
        :options="options"
        :error-messages="errorMessage"
        @input="onValueChange" />
</template>

<script>
import Select from '@Core/components/Inputs/Select/Select';

export default {
    name: 'JSONSchemaFormSelect',
    components: {
        Select,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
        errorMessage: {
            type: String,
            default: '',
        },
        default: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            localValue: '',
        };
    },
    created() {
        this.localValue = this.default;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;
            this.$emit('input', value);
        },
    },
};
</script>
