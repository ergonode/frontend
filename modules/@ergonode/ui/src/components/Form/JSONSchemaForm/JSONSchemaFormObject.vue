/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="schema.title">
        <Component
            v-for="element in objectComponents"
            :key="element.key"
            :is="element.component"
            :value="value[element.key]"
            :schema="element.props"
            :required="schema.required"
            :errors="errors[element.key]"
            @input="onValueChange" />
        <JSONSchemaOneOf
            v-if="schema.oneOf"
            :one-of="schema.oneOf"
            :value="value"
            :required="isRequired"
            :errors="errors"
            @input="onValueChange" />
    </FormSection>
</template>

<script>
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaFormObject',
    components: {
        JSONSchemaOneOf: () => import('@UI/components/Form/JSONSchemaForm/JSONSchemaOneOf'),
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
        schema: {
            type: Object,
            required: true,
        },
        /**
         * The map of widgets components
         */
        widgets: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The list of required fields
         */
        required: {
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
            objectComponents: [],
            fieldKeys: [],
            localValue: this.value,
        };
    },
    computed: {
        isRequired() {
            return this.required.indexOf(this.$vnode.key) !== -1;
        },
    },
    watch: {
        schema: {
            immediate: true,
            handler() {
                this.fieldsKeys = this.getFieldKeys();
                this.objectComponents = this.getComponents();
            },
        },
    },
    methods: {
        getFieldKeys() {
            return this.schema.properties ? Object.keys(this.schema.properties) : [];
        },
        getComponents() {
            const {
                length,
            } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type,
                    widget,
                    ...rest
                } = this.schema.properties[key];

                components.push({
                    key,
                    props: {
                        disabled: this.schema.disabled,
                        required: this.schema.required,
                        ...rest,
                    },
                    component: widget && this.widgets[widget]
                        ? this.widgets[widget]
                        : () => import(`@UI/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }

            return components;
        },
        onValueChange({
            key,
            value,
        }) {
            if (key) {
                this.localValue[key] = value;
            } else {
                this.localValue = value;
            }

            this.$emit('input', {
                key: this.$vnode.key,
                value: this.localValue,
            });
        },
    },
};
</script>
