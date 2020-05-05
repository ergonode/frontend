/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection>
        <ProductAttributeBindingField
            v-for="attribute in attributes"
            :key="attribute.id"
            :attribute="attribute" />
    </FormSection>
</template>

<script>
import FormSection from '@Core/components/Form/Section/FormSection';
import ProductAttributeBindingField from '@Products/components/Form/Field/ProductAttributeBindingField';

export default {
    name: 'ProductAttributesBindingFormSection',
    components: {
        FormSection,
        ProductAttributeBindingField,
    },
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
