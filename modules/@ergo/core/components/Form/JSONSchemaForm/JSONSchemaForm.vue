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
                :error-message="errorMessages[element.key]"
                v-bind="element.props"
                :key="element.key" />
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
    },
    computed: {
        fieldsKeys() {
            return Object.keys(this.schema.properties);
        },
        schemaComponents() {
            const { length } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type, ...rest
                } = this.schema.properties[key];

                components.push({
                    key,
                    props: rest,
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }

            return components;
        },
    },
};
</script>
