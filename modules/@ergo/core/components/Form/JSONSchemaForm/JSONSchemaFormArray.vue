/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <Component
            :is="arrayComponent"
            v-bind="{ ...items, ...value, ...errorMessages }"
            @input="onValueChange" />
    </FormSection>
</template>

<script>
import { toCapitalize } from '@Core/models/stringWrapper';
import FormSection from '@Core/components/Form/FormSection';

export default {
    name: 'JSONSchemaFormArray',
    components: {
        FormSection,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        widget: {
            type: String,
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        propKey: {
            type: String,
            required: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
        items: {
            type: Object,
            required: true,
        },
        required: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        arrayComponent() {
            if (this.widget === 'table') {
                return () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormTableWidget');
            }

            return () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaFormArray${toCapitalize(this.items.type)}`);
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', { key: this.propKey, value });
        },
    },
};
</script>
