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
        :error-messages="errorMessages"
        :is-information-label="false"
        :required="required"
        :disabled="disabled"
        :description="hint"
        @input="onValueChange">
        <template #append>
            <TextFieldSuffix
                v-if="parameter"
                :suffix="parameter" />
        </template>
    </TextField>
</template>

<script>
import productTemplateElementMixin from '@Templates/mixins/productTemplateElementMixin';
import TextField from '@Core/components/Inputs/TextField';

export default {
    name: 'ProductTemplateNumeric',
    components: {
        TextField,
        TextFieldSuffix: () => import('@Core/components/Inputs/TextFieldSuffix'),
    },
    mixins: [productTemplateElementMixin],
    computed: {
        inputType() {
            return { type: 'number' };
        },
        parameter() {
            if (!this.parameters) return null;

            const [key] = Object.keys(this.parameters);

            return this.parameters[key];
        },
    },
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>
