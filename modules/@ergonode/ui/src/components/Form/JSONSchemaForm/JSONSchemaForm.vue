/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <Form
        :title="schema.title"
        :fields-keys="fieldsKeys">
        <template #body>
            <Component
                v-for="element in schemaComponents"
                :key="element.key"
                :value="model[element.key]"
                :is="element.component"
                :schema="element.props"
                :required="schema.required"
                :widgets="widgets"
                :errors="errors[element.key]"
                @input="onValueChange" />
        </template>
    </Form>
</template>

<script>
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaForm',
    props: {
        /**
         * JSON schema
         */
        schema: {
            type: Object,
            default: () => ({
                properties: {},
                required: [],
            }),
        },
        /**
         * The map of widgets components
         */
        widgets: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
        /**
         * Is fields disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            model: {},
            fieldKeys: [],
            schemaComponents: [],
        };
    },
    watch: {
        schema: {
            immediate: true,
            handler() {
                this.fieldsKeys = this.getFieldKeys();
                this.schemaComponents = this.getComponents();
            },
        },
    },
    created() {
        this.model = JSON.parse(this.value);
    },
    methods: {
        getFieldKeys() {
            return this.schema.properties ? Object.keys(this.schema.properties) : [];
        },
        getComponents() {
            const {
                length,
            } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type,
                    widget,
                    ...rest
                } = this.schema.properties[key];

                components.push({
                    key,
                    props: {
                        disabled: this.disabled,
                        ...rest,
                    },
                    component: widget && this.widgets[widget]
                        ? this.widgets[widget]
                        : () => import(`@UI/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }

            return components;
        },
        onValueChange({
            key,
            value,
        }) {
            this.model[key] = value;

            this.$emit('input', JSON.stringify(this.model));
        },
    },
};
</script>
