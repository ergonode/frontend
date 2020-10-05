/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductAttributesBindingFormSection
        :disabled="disabled" />
</template>

<script>
import ProductAttributesBindingFormSection from '@Products/extends/components/Forms/Section/ProductAttributesBindingFormSection';

export default {
    name: 'ProductFormAttributeBinding',
    components: {
        ProductAttributesBindingFormSection,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
