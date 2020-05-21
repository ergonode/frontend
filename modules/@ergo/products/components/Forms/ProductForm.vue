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
import { mapState, mapActions } from 'vuex';

const getCategoriesOptions = () => import('@Categories/services/getCategoriesOptions.service');
const getTemplatesOptions = () => import('@Templates/services/getTemplatesOptions.service');

export default {
    name: 'ProductForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('product', {
            productID: state => state.id,
            sku: state => state.sku,
            template: state => state.template,
            categories: state => state.categories,
        }),
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
