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
        :error-messages="isError ? errorMessages : null"
        :is-information-label="false"
        :disabled="disabled"
        resize="none"
        @input="onValueChange" />
</template>

<script>
import productTemplateElementMixin from '~/mixins/product/productTemplateElementMixin';
import TextArea from '~/core/components/Inputs/TextArea';

export default {
    name: 'ProductTemplateMultiLine',
    mixins: [productTemplateElementMixin],
    components: {
        TextArea,
    },
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>
