/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CheckBox
        :value="localValue"
        :label="label"
        :disabled="schema.disabled"
        @input="onValueChange" />
</template>

<script>

export default {
    name: 'JSONSchemaFormBoolean',
    props: {
        /**
         * JSON schema
         */
        schema: {
            type: Object,
            required: true,
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
        /**
         * Component value
         */
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localValue: false,
        };
    },
    created() {
        this.localValue = this.value;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;

            if (this.$vnode.key) {
                this.$emit('input', {
                    key: this.$vnode.key,
                    value,
                });
            } else {
                this.$emit('input', value);
            }
        },
    },
};
</script>
