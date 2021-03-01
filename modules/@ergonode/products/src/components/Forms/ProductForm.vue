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
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Select
                    :value="type"
                    required
                    :disabled="isDisabled || !isAllowedToUpdate"
                    label="Product type"
                    :error-messages="errors[typeFieldKey]"
                    :options="productTypesValues"
                    @input="setTypeValue" />
            </FormSection>
            <FormSection v-if="type">
                <TextField
                    :value="sku"
                    hint="Products SKU must be unique"
                    label="SKU"
                    required
                    :error-messages="errors[skuFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setSkuValue" />
                <template v-for="(formComponent, index) in extendedForm">
                    <Component
                        :is="formComponent.component"
                        :key="index"
                        v-bind="bindingProps(formComponent)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import Select from '@UI/components/Select/Select';
import TextField from '@UI/components/TextField/TextField';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductForm',
    components: {
        Button,
        Divider,
        Form,
        FormSection,
        Select,
        TextField,
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
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Products/components/Forms/ProductForm',
                type: this.productTypeKey,
            });
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
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.PRODUCT.create,
            ]));
        },
        skuFieldKey() {
            return 'sku';
        },
        typeFieldKey() {
            return 'type';
        },
    },
    methods: {
        ...mapActions('product', [
            '__setState',
        ]),
        setTypeValue(value) {
            this.__setState({
                key: this.typeFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.typeFieldKey,
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
        bindingProps({
            props = {},
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
