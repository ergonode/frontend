/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <Component
            v-for="element in objectComponents"
            :is="element.component"
            v-bind="element.props"
            :key="element.key" />
    </FormSection>
</template>

<script>
import { toCapitalize } from '@Core/models/stringWrapper';
import FormSection from '@Core/components/Form/FormSection';

export default {
    name: 'JSONSchemaFormObject',
    components: {
        FormSection,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        errorMessage: {
            type: String,
            default: '',
        },
        properties: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            localValue: '',
        };
    },
    computed: {
        fieldsKeys() {
            return Object.keys(this.properties);
        },
        objectComponents() {
            const { length } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type, ...rest
                } = this.properties[key];

                components.push({
                    key,
                    props: rest,
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }

            return components;
        },
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
