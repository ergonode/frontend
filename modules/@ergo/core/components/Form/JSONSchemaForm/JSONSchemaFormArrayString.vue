/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSubsection>
        <Component
            v-for="element in enumComponents"
            :key="element.key"
            :is="element.component"
            :value="element.value"
            :small="true"
            :label="element.label"
            :error-messages="errorMessages"
            @input="onValueChange" />
    </FormSubsection>
</template>

<script>
import FormSubsection from '@Core/components/Form/FormSubsection';

export default {
    name: 'JSONSchemaFormArrayString',
    components: {
        FormSubsection,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
        errorMessages: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            enumComponents: [],
            localValue: this.value,
        };
    },
    created() {
        this.enumComponents = this.initializeComponents();
    },
    methods: {
        initializeComponents() {
            const { enum: options, enum_titles } = this.schema.items;

            if (!options && !enum_titles) return [];

            const { length } = options;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = options[i];

                components.push({
                    key,
                    value: this.value
                        ? this.value.findIndex(option => option === key) !== -1
                        : false,
                    label: enum_titles[i],
                    component: () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormBoolean'),
                });
            }

            return components;
        },
        onValueChange({ key, value }) {
            if (value) {
                this.localValue.push(key);
            } else {
                const index = this.localValue.findIndex(option => option === key);

                this.localValue.splice(index);
            }

            this.$emit('input', this.localValue);
        },
    },
};
</script>
