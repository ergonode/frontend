/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <Form
        :title="schema.title"
        :fields-keys="fieldsKeys">
        <template #body="{ errorMessages }">
            <Component
                v-for="element in schemaComponents"
                :is="element.component"
                v-bind="{ ...element.props, errorMessages: errorMessages[element.key] }"
                :key="element.key"
                @input="onValueChange" />
        </template>
    </Form>
</template>

<script>
import { toCapitalize } from '@Core/models/stringWrapper';
import Form from '@Core/components/Form/Form';

export default {
    name: 'JSONSchemaForm',
    components: {
        Form,
    },
    props: {
        schema: {
            type: Object,
            required: true,
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
            return Object.keys(this.schema.properties);
        },
    },
    created() {
        this.model = JSON.parse(this.value);

        this.schemaComponents = this.initializeSchemaComponents();
    },
    methods: {
        initializeSchemaComponents() {
            const { length } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type, ...rest
                } = this.schema.properties[key];

                components.push({
                    key,
                    props: {
                        propKey: key,
                        value: this.model[key],
                        isRequired: this.schema.required
                            && this.schema.required.indexOf(key) !== -1,
                        ...rest,
                    },
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });

                if (i + 1 !== length) {
                    components.push({
                        key: `[${i}]-divider`,
                        props: {},
                        component: () => import('@Core/components/Dividers/Divider'),
                    });
                }
            }
            return components;
        },
        onValueChange({ key, value }) {
            this.model[key] = value;
            this.$emit('input', JSON.stringify(this.model));
        },
    },
};
</script>
