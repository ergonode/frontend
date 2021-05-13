/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSubsection>
        <Select
            :value="selectedOption"
            :options="options"
            @input="onVariationValueChange" />
        <Component
            v-for="element in oneOfComponents[selectedOption]"
            :key="element.key"
            :is="element.component"
            :schema="element.props"
            :value="value[element.key]"
            :errors="errors[element.key]"
            @input="onValueChange" />
    </FormSubsection>
</template>

<script>
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import FormSubsection from '@UI/components/Form/Subsection/FormSubsection';
import Select from '@UI/components/Select/Select';

export default {
    name: 'JSONSchemaOneOf',
    components: {
        Select,
        FormSubsection,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({}),
        },
        /**
         * JSON schema
         */
        oneOf: {
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
            fieldsKeys: {},
            selectedOption: this.oneOf[0].title || 'Option 1',
            oneOfComponents: {},
        };
    },
    computed: {
        options() {
            return this.oneOf.map((option, index) => option.title || `Option ${index + 1}`);
        },
    },
    watch: {
        schema: {
            immediate: true,
            handler() {
                this.oneOf.forEach((option, index) => {
                    const title = option.title || `Option ${index + 1}`;

                    this.fieldsKeys[title] = Object.keys(option.properties);

                    this.oneOfComponents[title] = this.getComponents({
                        title,
                        properties: this.oneOf[index].properties,
                    });
                });
            },
        },
    },
    methods: {
        getComponents({
            title,
            properties,
        }) {
            const {
                length,
            } = this.fieldsKeys[title];

            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[title][i];
                const {
                    type,
                    ...rest
                } = properties[key];

                components.push({
                    key,
                    props: {
                        ...rest,
                    },
                    component: () => import(`@UI/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }

            return components;
        },
        onVariationValueChange(value) {
            this.selectedOption = value;
            this.$emit('input', {
                value: {},
            });
        },
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
