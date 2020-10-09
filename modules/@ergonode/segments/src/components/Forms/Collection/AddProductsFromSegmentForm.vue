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
                <TranslationSelect
                    :value="segments"
                    :multiselect="true"
                    label="From segmentation rules"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[segmentsFieldKey]"
                    :options="segmentOptions"
                    @input="onSegmentChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TranslationSelect from '@Core/components/Select/TranslationSelect';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';

export default {
    name: 'AddProductsFromSegmentForm',
    components: {
        Form,
        FormSection,
        TranslationSelect,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
        segments: {
            type: Array,
            default: () => [],
        },
        segmentOptions: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        segmentsFieldKey() {
            return 'segments';
        },
    },
    methods: {
        onSegmentChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
