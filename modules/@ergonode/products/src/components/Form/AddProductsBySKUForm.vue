/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TextArea
                    :value="productSkus"
                    label="By SKU"
                    hint="Separate multiple SKU’s by using enter or comma, e.g. “SKU1, SKU2, SKU3”"
                    resize="none"
                    height="150px"
                    :error-messages="errors[skusFieldKey]"
                    :disabled="!isUserAllowedToUpdate"
                    @input="onSKUChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextArea from '@Core/components/Inputs/TextArea';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';

export default {
    name: 'AddProductsBySKUForm',
    components: {
        Form,
        FormSection,
        TextArea,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
        productSkus: {
            type: String,
            default: '',
        },
        isUserAllowedToUpdate: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        skusFieldKey() {
            return 'skus';
        },
    },
    methods: {
        onSKUChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
