/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="arrayComponent"
        :value="value"
        :schema="schema"
        :required="isRequired"
        :errors="errors"
        @input="onValueChange" />
</template>

<script>
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaFormArray',
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
            type: Array,
            default: () => [],
        },
        /**
         * The map of widgets components
         */
        widgets: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The list of required fields
         */
        required: {
            type: Array,
            default: () => [],
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            fieldKeys: [],
            arrayComponent: null,
        };
    },
    computed: {
        isRequired() {
            return this.required.indexOf(this.$vnode.key) !== -1;
        },
    },
    watch: {
        schema: {
            immediate: true,
            handler() {
                this.fieldsKeys = this.getFieldKeys();
                this.arrayComponent = this.widgets[this.schema.widget]
                    ? this.widgets[this.schema.widget]
                    : () => import(`@UI/components/Form/JSONSchemaForm/JSONSchemaFormArray${toCapitalize(this.schema.items.type)}`);
            },
        },
    },
    methods: {
        getFieldKeys() {
            return this.schema.properties ? Object.keys(this.schema.properties) : [];
        },
        onValueChange(value) {
            this.$emit('input', {
                key: this.$vnode.key,
                value,
            });
        },
    },
};
</script>
