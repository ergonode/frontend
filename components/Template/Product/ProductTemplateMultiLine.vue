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
        @input="onValueChange">
        <template #append>
            <ProductTemplateDetailsContent
                :hint="hint"
                :error-messages="errorMessages"
                :is-error="isError" />
        </template>
    </TextArea>
</template>

<script>
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';

export default {
    name: 'ProductTemplateMultiLine',
    mixins: [baseProductTemplateElementMixin],
    components: {
        TextArea: () => import('~/components/Inputs/TextArea'),
    },
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>
