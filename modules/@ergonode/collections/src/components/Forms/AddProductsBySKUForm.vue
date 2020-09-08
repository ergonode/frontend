/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :fields-keys="[skusFieldKey]"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextArea
                    :value="productSkus"
                    label="By SKU"
                    hint="Separate multiple SKU’s by using enter or comma, e.g. “SKU1, SKU2, SKU3”"
                    resize="none"
                    height="150px"
                    :error-messages="errorMessages[skusFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="onSKUChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
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
        productSkus: {
            type: String,
            default: '',
        },
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
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
