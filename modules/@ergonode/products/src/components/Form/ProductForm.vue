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
                    required
                    :disabled="isDisabled"
                    label="Product type"
                    :options="productTypesValues"
                    @input="setTypeValue" />
                <ProductAttributesBindingFormSection
                    v-show="isProductWithVariants"
                    :disabled="isDisabledByPrivileges" />
                <TextField
                    :value="sku"
                    hint="Products SKU must be unique"
                    label="SKU"
                    required
                    :error-messages="errorMessages[skuFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    @input="setSkuValue" />
                <TranslationLazySelect
                    :value="template"
                    :required="true"
                    label="Product template"
                    :error-messages="errorMessages[templateIdFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :fetch-options-request="getTemplatesOptionsRequest"
                    @input="setTemplateValue" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import PRIVILEGES from '@Products/config/privileges';
import {
    EXTENDS,
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    mapActions,
    mapState,
} from 'vuex';

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
        }),
        extendedForm() {
            return this.$getExtendedComponents(EXTENDS['@Products/components/Form/ProductForm']);
        },
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
            return (this.isDisabled && !this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]))
            || (!this.isDisabled && !this.$hasAccess([
                PRIVILEGES.PRODUCT.create,
            ]));
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
            '__setState',
        ]),
        setTypeValue(value) {
            this.__setState({
                key: 'type',
                value,
            });
        },
        setSkuValue(value) {
            this.__setState({
                key: 'sku',
                value,
            });
        },
        setTemplateValue(value) {
            this.__setState({
                key: 'template',
                value,
            });
        },
        getTemplatesOptionsRequest() {
            return getTemplatesOptions().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                },
            ));
        },
        bindingProps({
            props,
        }) {
            return {
                disabled: this.isDisabledByPrivileges,
                ...props,
            };
        },
    },
};
</script>
