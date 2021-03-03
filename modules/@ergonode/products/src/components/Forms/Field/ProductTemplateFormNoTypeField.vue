/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <span
            v-text="placeholderTitle"
            class="field-no-results-placeholder " />
    </ProductTemplateFormField>
</template>

<script>
import ProductTemplateFormField from '@Products/components/Forms/Field/ProductTemplateFormField';

export default {
    name: 'ProductTemplateFormNoTypeField',
    components: {
        ProductTemplateFormField,
    },
    props: {
        size: {
            type: Object,
            default: () => ({}),
        },
        position: {
            type: Object,
            default: () => ({}),
        },
        type: {
            type: String,
            required: true,
        },
    },
    computed: {
        placeholderTitle() {
            return `No support for "${this.type}" type of attribute`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .field-no-results-placeholder {
        z-index: $Z_INDEX_LVL_2;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        outline: none;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        border: $BORDER_1_GREY;
        padding: 10px 8px 10px 12px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
        cursor: not-allowed;
    }
</style>
