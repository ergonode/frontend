/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="$attrs.title">
        <Component
            :is="arrayComponent"
            v-bind="{ ...$attrs.items, ...$attrs.default, ...$attrs.errorMessages }"
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
    inheritAttrs: false,
    computed: {
        arrayComponent() {
            if (this.$attrs.widget && this.$attrs.widget === 'table') {
                return () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormTableWidget');
            }

            return () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaFormArray${toCapitalize(this.$attrs.items.type)}`);
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', { key: this.$attrs.propKey, value });
        },
    },
};
</script>
