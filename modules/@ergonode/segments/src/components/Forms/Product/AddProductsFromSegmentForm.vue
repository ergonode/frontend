/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form :fields-keys="[segmentsFieldKey]">
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
import PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'AddProductsFromSegmentForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
    },
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
