/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Products.product.components.ProductForm.title')"
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
                    :label="$t('@Products.product.components.ProductForm.typeLabel')"
                    :error-messages="errors[typeFieldKey]"
                    :options="productTypesValues"
                    @input="setTypeValue" />
            </FormSection>
            <FormSection v-if="type">
                <TextField
                    :value="sku"
                    :label="$t('@Products.product.components.ProductForm.skuLabel')"
                    :hint="$t('@Products.product.components.ProductForm.skuHint')"
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
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductForm',
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
