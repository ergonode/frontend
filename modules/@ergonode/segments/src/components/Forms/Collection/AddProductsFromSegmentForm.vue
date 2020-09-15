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
import PRIVILEGES from '@Collections/config/privileges';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';

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
        isUserAllowedToUpdate() {
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
