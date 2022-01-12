/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        :change-values="changeValues"
        :errors-presentation-mapper="errorMapper"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body="{ presentationErrors }">
            <FormSection>
                <TextArea
                    :value="productSkus"
                    :label="$t('@Products.productExtend.components.AddProductsBySKUForm.skuLabel')"
                    :hint="$t('@Products.productExtend.components.AddProductsBySKUForm.skuHint')"
                    resize="none"
                    height="150px"
                    :error-messages="presentationErrors.join(' ')"
                    :disabled="!isAllowedToUpdate"
                    @input="onSKUChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'AddProductsBySKUForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
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
                PRIVILEGES.PRODUCT.update,
            ]);
        },
        skusFieldKey() {
            return 'skus';
        },
    },
    methods: {
        errorMapper(errors) {
            return Object.keys(errors).reduce((prev, curr) => [
                ...prev,
                ...(typeof errors[curr] === 'string' ? [
                    errors[curr],
                ] : Object.keys(errors[curr]).map(key => `${key} - ${errors[curr][key]}`)),
            ], []);
        },
        onSKUChange(value) {
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.skusFieldKey,
                value,
            });

            this.$emit('input', value);
        },
    },
};
</script>
