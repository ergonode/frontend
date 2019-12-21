/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextArea
        :value="localValue"
        solid
        :label="label"
        :placeholder="placeholder"
        :required="required"
        :error-messages="isError ? [' '] : null"
        :disabled="disabled"
        resize="none"
        @input="onValueChange" />
</template>

<script>
import productTemplateElementMixin from '~/mixins/product/productTemplateElementMixin';

export default {
    name: 'ProductTemplateMultiLine',
    mixins: [productTemplateElementMixin],
    components: {
        TextArea: () => import('@Core/components/Inputs/TextArea'),
    },
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>
