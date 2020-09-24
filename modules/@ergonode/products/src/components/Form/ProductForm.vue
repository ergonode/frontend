/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
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
                    :error-messages="errors[skuFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setSkuValue" />
                <TranslationLazySelect
                    :value="template"
                    :required="true"
                    label="Product template"
                    :error-messages="errors[templateIdFieldKey]"
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
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import Select from '@Core/components/Inputs/Select/Select';
import TranslationLazySelect from '@Core/components/Inputs/Select/TranslationLazySelect';
import TextField from '@Core/components/Inputs/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
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
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('dictionaries', [
            'productTypes',
        ]),
        ...mapState('product', [
            'id',
            'sku',
            'type',
            'template',
        ]),
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
                key: 'bindingAttributesIds',
                value: [],
            });
            this.__setState({
                key: 'type',
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'type',
                value,
            });
        },
        setSkuValue(value) {
            this.__setState({
                key: this.skuFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.skuFieldKey,
                value,
            });
        },
        setTemplateValue(value) {
            this.__setState({
                key: 'template',
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'template',
                value,
            });
        },
        bindingProps({
            props,
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                changeValues: this.changeValues,
                scope: this.scope,
                errors: this.errors,
                ...props,
            };
        },
    },
};
</script>
