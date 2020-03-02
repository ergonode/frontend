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
        :error-messages="errorMessages"
        :is-information-label="false"
        :disabled="disabled"
        resize="none"
        @input="onValueChange" />
</template>

<script>
import productTemplateElementMixin from '@Templates/mixins/productTemplateElementMixin';
import TextArea from '@Core/components/Inputs/TextArea';

export default {
    name: 'ProductTemplateMultiLine',
    components: {
        TextArea,
    },
    mixins: [productTemplateElementMixin],
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>
