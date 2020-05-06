/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="schema.title">
        <Component
            :is="arrayComponent"
            :value="value"
            :schema="schema"
            :error-messages="errorMessages"
            @input="onValueChange" />
    </FormSection>
</template>

<script>
import { toCapitalize } from '@Core/models/stringWrapper';
import FormSection from '@Core/components/Form/Section/FormSection';

export default {
    name: 'JSONSchemaFormArray',
    components: {
        FormSection,
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
            arrayComponent: null,
        };
    },
    created() {
        this.arrayComponent = () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaFormArray${toCapitalize(this.schema.items.type)}`);
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', { key: this.$vnode.key, value });
        },
    },
};
</script>
