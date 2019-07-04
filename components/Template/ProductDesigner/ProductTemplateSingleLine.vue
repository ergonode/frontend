/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        solid
        :label="label"
        :placeholder="placeholder"
        :error-messages="isError ? [' '] : null"
        :required="required"
        @input="onValueChange">
        <ProductTemplateDetailsContent
            slot="appendIcon"
            :hint="hint"
            :error-messages="errorMessages"
            :is-error="isError" />
    </TextField>
</template>

<script>
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';

export default {
    name: 'ProductTemplateSingleLine',
    mixins: [baseProductTemplateElementMixin],
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
    },
    computed: {
        suffix() {
            if (this.parameters) {
                if (this.parameters.code) {
                    return this.parameters.code;
                }
                if (this.parameters.currency) {
                    return this.parameters.currency;
                }
                return '';
            }
            return '';
        },
    },
};
</script>
