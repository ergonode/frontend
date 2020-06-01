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
                    v-show="productTypeKey === 'VARIABLE-PRODUCT'"
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
                <TranslationSelect
                    :value="template"
                    :solid="true"
                    :required="true"
                    :regular="true"
                    label="Product template"
                    :error-messages="errorMessages[templateIdFieldKey]"
                    :options="templateOptions"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    @input="setProductTemplate" />
                <TranslationSelect
                    :value="selectedCategories"
                    :solid="true"
                    :regular="true"
                    :multiselect="true"
                    :clearable="true"
                    label="Category"
                    :options="categoryOptions"
                    :disabled="isDisabledByPrivileges"
                    @input="setProductCategories" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';

export default {
    name: 'ProductForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
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
            templates: state => state.templates,
            selectedCategories: state => state.selectedCategories,
            categories: state => state.categories,
        }),
        productTypeKey() {
            return getKeyByValue(this.productTypes, this.type);
        },
        productTypesValues() {
            return Object.values(this.productTypes);
        },
        templateOptions() {
            return this.templates.map(({ id, name }) => ({
                id, key: '', value: name, hint: '',
            }));
        },
        categoryOptions() {
            return this.categories.map(({ id, code, name }) => ({
                id, key: code, value: name, hint: name ? `#${code} ${this.userLanguageCode}` : '',
            }));
        },
        isDisabled() {
            return Boolean(this.productID);
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
    },
};
</script>
