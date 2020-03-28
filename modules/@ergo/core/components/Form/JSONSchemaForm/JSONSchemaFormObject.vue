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
            :key="element.key"
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
        title: {
            type: String,
            default: '',
        },
        value: {
            type: Object,
            default: () => ({}),
        },
        properties: {
            type: Object,
            required: true,
        },
        required: {
            type: Array,
            default: () => [],
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
            return Object.keys(this.properties);
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
                } = this.properties[key];

                components.push({
                    key,
                    props: {
                        value: this.value[key],
                        small: true,
                        isRequired: this.required.indexOf(key) !== -1,
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
