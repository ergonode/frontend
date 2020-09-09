/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :fields-keys="[segmentsFieldKey]"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body="{ errorMessages }">
            <FormSection>
                <TranslationSelect
                    :value="segments"
                    :multiselect="true"
                    label="From segmentation rules"
                    :disabled="!isUserAllowedToUpdate"
                    :error-messages="errorMessages[segmentsFieldKey]"
                    :options="segmentOptions"
                    @input="onSegmentChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'AddProductsFromSegmentForm',
    components: {
        Form,
        FormSection,
        TranslationSelect,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
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
        segmentsFieldKey() {
            return 'segments';
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        onSegmentChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
