/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="stringComponent"
        :value="value"
        :schema="schema"
        :error-messages="errors"
        @input="onValueChange" />
</template>

<script>
export default {
    name: 'JSONSchemaFormString',
    props: {
        /**
         * JSON schema
         */
        schema: {
            type: Object,
            required: true,
        },
        /**
         * The validation errors
         */
        errors: {
            type: String,
            default: '',
        },
        /**
         * Component value
         */
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

        if (options) this.stringComponent = () => import('@UI/components/Form/JSONSchemaForm/JSONSchemaFormSelect');
        else this.stringComponent = () => import('@UI/components/Form/JSONSchemaForm/JSONSchemaFormText');
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
