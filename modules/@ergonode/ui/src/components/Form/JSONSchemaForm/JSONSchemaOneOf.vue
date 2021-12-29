/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSubsection :required="required">
        <Select
            :value="selectedOption"
            :options="options"
            :error-messages="errorMessages"
            @input="onVariationValueChange" />
        <Component
            v-for="element in oneOfComponents[selectedOption]"
            :key="element.key"
            :is="element.component"
            :schema="element.props"
            :value="value[element.key]"
            :errors="errors"
            @input="onValueChange" />
    </FormSubsection>
</template>

<script>
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaOneOf',
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
         * Determines if the given field is required
         */
        required: {
            type: Boolean,
            default: false,
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
        errorMessages() {
            let errorMessage = '';
            const selectedFields = this.fieldsKeys[this.selectedOption] || [];

            Object.keys(this.errors).forEach((errorKey) => {
                if (selectedFields.includes(errorKey)) {
                    errorMessage = this.errors[errorKey];
                }
            });

            return errorMessage;
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
    created() {
        if (!isEmpty(this.value)) {
            const selectedOptionKey = Object.keys(this.value).find(key => this.value[key].length);

            if (selectedOptionKey) {
                Object.keys(this.fieldsKeys).forEach((fieldTitle) => {
                    if (this.fieldsKeys[fieldTitle].includes(selectedOptionKey)) {
                        this.selectedOption = fieldTitle;
                    }
                });
            }
        }
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
