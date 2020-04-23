/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="schema.title">
        <Component
            v-for="element in objectComponents"
            :key="element.key"
            :is="element.component"
            :small="true"
            :value="value[element.key]"
            :schema="element.props"
            @input="onValueChange" />
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
        value: {
            type: Object,
            default: () => ({}),
        },
        schema: {
            type: Object,
            required: true,
        },
        errorMessages: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            objectComponents: [],
            localValue: this.value,
        };
    },
    computed: {
        fieldsKeys() {
            return Object.keys(this.schema.properties);
        },
    },
    created() {
        this.objectComponents = this.initializeComponents();
    },
    methods: {
        initializeComponents() {
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
                        isRequired: this.schema.required.indexOf(key) !== -1,
                        ...rest,
                    },
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }

            return components;
        },
        onValueChange({ key, value }) {
            this.localValue[key] = value;
            this.$emit('input', { key: this.$vnode.key, value: this.localValue });
        },
    },
};
</script>
