/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        :input="inputType"
        solid
        regular
        :label="label"
        :placeholder="placeholder"
        :error-messages="isError ? errorMessages : null"
        :is-information-label="false"
        :required="required"
        :disabled="disabled"
        :description="hint"
        @input="onValueChange" />
</template>

<script>
import productTemplateElementMixin from '@Templates/mixins/productTemplateElementMixin';
import TextField from '@Core/components/Inputs/TextField';

export default {
    name: 'ProductTemplateNumeric',
    components: {
        TextField,
    },
    mixins: [productTemplateElementMixin],
    computed: {
        inputType() {
            return { type: 'number' };
        },
    },
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>

<style lang="scss" scoped>
    .suffix {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: $GRAPHITE_DARK;
        margin-right: 4px;
    }
</style>
