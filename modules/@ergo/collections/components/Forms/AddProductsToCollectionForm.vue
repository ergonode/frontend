/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form :fields-keys="[skusFieldKey]">
        <template #body="{ errorMessages }">
            <FormGroup>
                <TranslationSelect
                    :value="segments"
                    solid
                    :multiselect="true"
                    label="From segmentation rules"
                    regular
                    :disabled="isDisabledByPrivileges"
                    :options="segmentOptions"
                    @input="(value) => $emit('input', { key: 'segments', value })" />
                <TextArea
                    :value="productSkus"
                    solid
                    label="By SKU"
                    hint="Separate multiple SKU’s by using enter or comma, e.g. “SKU1, SKU2, SKU3”"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorMessages[skusFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="(value) => $emit('input', { key: 'productSkus', value })" />
            </FormGroup>
        </template>
    </Form>
</template>

<script>

export default {
    name: 'AddProductsToCollectionForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
        TextArea: () => import('@Core/components/Inputs/TextArea'),
    },
    props: {
        segments: {
            type: Array,
            default: () => [],
        },
        productSkus: {
            type: String,
            default: '',
        },
        segmentOptions: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['PRODUCT_COLLECTION_UPDATE']))
                || (!this.isDisabled && !this.$hasAccess(['PRODUCT_COLLECTION_CREATE']));
        },
        skusFieldKey() {
            return 'skus';
        },
    },
};
</script>
