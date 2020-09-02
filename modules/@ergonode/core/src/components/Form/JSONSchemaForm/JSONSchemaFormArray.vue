/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSubsection
        :title="schema.title"
        :required="schema.isRequired">
        <Component
            :is="arrayComponent"
            :value="value"
            :schema="schema"
            @input="onValueChange" />
        <FormErrorLabel
            v-if="errorMessages"
            :error-messages="errorMessages" />
    </FormSubsection>
</template>

<script>
import FormSubsection from '@Core/components/Form/Subsection/FormSubsection';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaFormArray',
    components: {
        FormSubsection,
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
