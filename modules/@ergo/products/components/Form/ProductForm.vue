/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[skuFieldKey, templateIdFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <Select
                    :value="type"
                    solid
                    regular
                    required
                    :disabled="isDisabled"
                    label="Product type"
                    :options="productTypesValues"
                    @input="setProductType" />
                <ProductAttributesBindingFormSection
                    v-show="isProductWithVariants"
                    :disabled="isDisabledByPrivileges" />
                <TextField
                    :value="sku"
                    hint="Products SKU must be unique"
                    solid
                    regular
                    label="SKU"
                    required
                    :error-messages="errorMessages[skuFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    @input="setProductSku" />
                <TranslationLazySelect
                    :value="template"
                    :solid="true"
                    :required="true"
                    :regular="true"
                    label="Product template"
                    :error-messages="errorMessages[templateIdFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :fetch-options-request="getTemplatesOptionsRequest"
                    @input="setProductTemplate" />
                <TranslationLazySelect
                    :value="categories"
                    :solid="true"
                    :regular="true"
                    :multiselect="true"
                    :clearable="true"
                    label="Category"
                    :disabled="isDisabledByPrivileges"
                    :fetch-options-request="getCategoriesOptionsRequest"
                    @input="setProductCategories" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { getKeyByValue } from '@Core/models/objectWrapper';
import { PRODUCT_TYPE } from '@Products/defaults';
import { mapActions, mapState } from 'vuex';

const getCategoriesOptions = () => import('@Categories/services/getCategoriesOptions.service');
const getTemplatesOptions = () => import('@Templates/services/getTemplatesOptions.service');

export default {
    name: 'ProductForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
        ProductAttributesBindingFormSection: () => import('@Products/components/Form/Section/ProductAttributesBindingFormSection'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            productTypes: state => state.productTypes,
        }),
        ...mapState('product', {
            productID: state => state.id,
            sku: state => state.sku,
            type: state => state.type,
            template: state => state.template,
            categories: state => state.categories,
        }),
        productTypeKey() {
            return getKeyByValue(this.productTypes, this.type);
        },
        productTypesValues() {
            return Object.values(this.productTypes);
        },
        isDisabled() {
            return Boolean(this.productID);
        },
        isProductWithVariants() {
            return this.productTypeKey === PRODUCT_TYPE.WITH_VARIANTS;
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['PRODUCT_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['PRODUCT_CREATE']));
        },
        templateIdFieldKey() {
            return 'templateId';
        },
        skuFieldKey() {
            return 'sku';
        },
    },
    methods: {
        ...mapActions('product', [
            'setProductSku',
            'setProductTemplate',
            'setProductCategories',
            'setProductType',
        ]),
        getCategoriesOptionsRequest() {
            return getCategoriesOptions().then(response => response.default(
                { $axios: this.$axios, $store: this.$store },
            ));
        },
        getTemplatesOptionsRequest() {
            return getTemplatesOptions().then(response => response.default(
                { $axios: this.$axios, $store: this.$store },
            ));
        },
    },
};
</script>
