/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Products.product.components.CreateProductModalForm.title')"
        @close="onClose">
        <template #body>
            <ProductForm
                :submit-title="$t('@Products._.create')"
                :proceed-title="$t('@Products._.proceed')"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import ProductForm from '@Products/components/Forms/ProductForm';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateProductModalForm',
    components: {
        ProductForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    async fetch() {
        this.__clearStorage();

        await this.getInitialDictionaries({
            keys: [
                'productTypes',
            ],
        });
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    methods: {
        ...mapActions('product', [
            'createProduct',
            '__clearStorage',
        ]),
        ...mapActions('dictionaries', [
            'getInitialDictionaries',
        ]),
        onClose() {
            this.__clearStorage();
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.createProduct({
                scope: this.scope,
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeScopeErrors(this.scope);
            this.createProduct({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.CreateProductModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.onClose();
            this.$router.push({
                name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                params: {
                    id,
                },
            });
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
            this.isProceeding = false;
        },
    },
};
</script>
