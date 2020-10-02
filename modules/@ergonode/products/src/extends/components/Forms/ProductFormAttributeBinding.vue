/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductAttributesBindingFormSection
        :disabled="disabled" />
</template>

<script>

export default {
    name: 'ProductFormAttributeBinding',
    components: {
        ProductAttributesBindingFormSection: () => import('@Products/extends/components/Forms/Section/ProductAttributesBindingFormSection'),
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
