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
                :errors="errors[element.key]"
                @input="onValueChange" />
        </template>
    </Form>
</template>

<script>
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import Form from '@UI/components/Form/Form';

export default {
    name: 'JSONSchemaForm',
    components: {
        Form,
    },
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
            schemaComponents: [],
        };
    },
    computed: {
        fieldsKeys() {
            if (typeof this.schema.properties === 'undefined') {
                return [];
            }

            return Object.keys(this.schema.properties);
        },
    },
    created() {
        this.model = JSON.parse(this.value);
        this.schemaComponents = this.getComponents();
    },
    methods: {
        getComponents() {
            const {
                length,
            } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type, ...rest
                } = this.schema.properties[key];

                components.push({
                    key,
                    props: {
                        isRequired: this.schema.required
                            && this.schema.required.indexOf(key) !== -1,
                        disabled: this.disabled,
                        ...rest,
                    },
                    component: () => import(`@UI/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
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
