/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        solid
        :label="labelWithSuffix"
        :placeholder="placeholder"
        :error-messages="isError ? [' '] : null"
        :required="required"
        @input="onValueChange">
        <template v-slot:append>
            <ProductTemplateDetailsContent
                :hint="hint"
                :error-messages="errorMessages"
                :is-error="isError" />
        </template>
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
        labelWithSuffix() {
            if (this.parameters) {
                if (this.parameters.code) {
                    return `${this.label} [${this.parameters.code}]`;
                }
                if (this.parameters.currency) {
                    return `${this.label} ${this.parameters.currency}`;
                }
                return this.label;
            }
            return this.label;
        },
    },
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>
