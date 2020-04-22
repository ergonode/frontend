/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField v-bind="$attrs">
        <span
            class="product-template-section"
            v-text="$attrs.label" />
    </ProductTemplateFormField>
</template>

<script>
import ProductTemplateFormField from '@Products/components/Forms/Fields/ProductTemplateFormField';

export default {
    name: 'ProductTemplateFormSectionField',
    components: {
        ProductTemplateFormField,
    },
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
    .product-template-section {
        display: flex;
        align-items: center;
        height: 100%;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_24_32;
    }
</style>
