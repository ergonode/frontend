/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                :error-messages="errors[element.key]"
                @input="onValueChange" />
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaForm',
    components: {
        Form,
    },
    props: {
        schema: {
            type: Object,
            default: () => ({
                properties: {},
                required: [],
            }),
        },
        value: {
            type: String,
            default: '',
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
                        ...rest,
                    },
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }
            return components;
        },
        onValueChange({
            key, value,
        }) {
            this.model[key] = value;
            this.$emit('input', JSON.stringify(this.model));
        },
    },
};
</script>
