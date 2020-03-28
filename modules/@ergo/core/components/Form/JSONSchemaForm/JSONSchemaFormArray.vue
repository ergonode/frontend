/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <Component
            :is="arrayComponent"
            v-bind="{ ...items, value, errorMessages }"
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
        errorMessages: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: Array,
            default: () => [],
        },
        items: {
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
        this.arrayComponent = () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaFormArray${toCapitalize(this.items.type)}`);
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', { key: this.$vnode.key, value });
        },
    },
};
</script>
