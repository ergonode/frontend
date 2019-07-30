/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextArea
        :value="value"
        solid
        :label="label"
        :placeholder="placeholder"
        :required="required"
        :error-messages="isError ? [' '] : null"
        resize="none"
        @input="onValueChange">
        <template v-slot:append>
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
};
</script>
