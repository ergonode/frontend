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
            @input="onValueChange" />
        <FormErrorLabel
            v-if="errorMessages"
            :error-messages="errorMessages" />
    </FormSection>
</template>

<script>
import FormSection from '@Core/components/Form/Section/FormSection';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaFormArray',
    components: {
        FormSection,
        FormErrorLabel: () => import('@Core/components/Form/FormErrorLabel'),
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
            type: String,
            default: '',
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
            this.$emit('input', {
                key: this.$vnode.key,
                value,
            });
        },
    },
};
</script>
