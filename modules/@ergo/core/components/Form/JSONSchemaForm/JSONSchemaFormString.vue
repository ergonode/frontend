/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="stringComponent"
        :value="value"
        :schema="schema"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>

<script>
export default {
    name: 'JSONSchemaFormString',
    props: {
        schema: {
            type: Object,
            required: true,
        },
        errorMessages: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            stringComponent: null,
        };
    },
    created() {
        const {
            enum: options,
        } = this.schema;

        if (options) this.stringComponent = () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormSelect');
        else this.stringComponent = () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormText');
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                key: this.$vnode.key,
                value,
            });
        },
    },
};
</script>
