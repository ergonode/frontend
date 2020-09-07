/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[skuFieldKey, templateIdFieldKey]"
        @submit="onSubmit">
        <template #body="{ errorMessages }">
            <FormSection>
                <Select
                    :value="type"
                    required
                    :disabled="isDisabled || !isAllowedToUpdate"
                    label="Product type"
                    :options="productTypesValues"
                    @input="setTypeValue" />
                <ProductAttributesBindingFormSection
                    v-show="isProductWithVariants"
                    :disabled="!isAllowedToUpdate" />
                <TextField
                    :value="sku"
                    hint="Products SKU must be unique"
                    label="SKU"
                    required
                    :error-messages="errorMessages[skuFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setSkuValue" />
                <TranslationLazySelect
                    :value="template"
                    :required="true"
                    label="Product template"
                    :error-messages="errorMessages[templateIdFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :fetch-options-request="getTemplateOptions"
                    @input="setTemplateValue" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
        <template #submit>
            <slot name="submitForm" />
        </template>
        <template #procced>
            <slot name="proceedForm" />
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import Select from '@Core/components/Inputs/Select/Select';
import TranslationLazySelect from '@Core/components/Inputs/Select/TranslationLazySelect';
import TextField from '@Core/components/Inputs/TextField';
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

export default {
    name: 'ProductForm',
    components: {
        Form,
        FormSection,
        Select,
        TextField,
        TranslationLazySelect,
        ProductAttributesBindingFormSection: () => import('@Products/components/Form/Section/ProductAttributesBindingFormSection'),
    },
    computed: {
        ...mapState('dictionaries', {
            productTypes: state => state.productTypes,
        }),
        ...mapState('product', {
            id: state => state.id,
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
            return Boolean(this.id);
        },
        isProductWithVariants() {
            return this.productTypeKey === PRODUCT_TYPE.WITH_VARIANTS;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
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
        ...mapActions('productTemplate', [
            'getTemplateOptions',
        ]),
        onSubmit() {
            this.$emit('submit');
        },
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
        bindingProps({
            props,
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
    },
};
</script>
