/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <FormSubsection>
            <Component
                v-for="element in objectComponents"
                :is="element.component"
                v-bind="element.props"
                :key="element.key" />
        </FormSubsection>
    </FormSection>
</template>

<script>
import FormSection from '@Core/components/Form/FormSection';
import FormSubsection from '@Core/components/Form/FormSubsection';

export default {
    name: 'JSONSchemaFormObject',
    components: {
        FormSection,
        FormSubsection,
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
                    type, enum: options, enum_titles: optionTitles, ...rest
                } = this.properties[key];

                switch (type) {
                case 'string': {
                    const isSelect = typeof options !== 'undefined';

                    if (isSelect) {
                        components.push({
                            key,
                            props: {
                                options,
                                ...rest,
                            },
                            component: () => import('@Core/components/Form/JSONSchemaFormSelect'),
                        });
                    } else {
                        components.push({
                            key,
                            props: rest,
                            component: () => import('@Core/components/Form/JSONSchemaFormText'),
                        });
                    }
                    break;
                }
                case 'boolean':
                    components.push({
                        key,
                        props: rest,
                        component: () => import('@Core/components/Form/JSONSchemaFormBoolean'),
                    });
                    break;
                case 'array':
                    components.push({
                        key,
                        props: rest,
                        component: () => import('@Core/components/Form/JSONSchemaFormArray'),
                    });
                    break;
                case 'object':
                    components.push({
                        key,
                        props: rest,
                        component: () => import('@Core/components/Form/JSONSchemaFormObject'),
                    });
                    break;
                default:
                    console.error(`Not supported form type: ${type}`);
                    break;
                }
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
