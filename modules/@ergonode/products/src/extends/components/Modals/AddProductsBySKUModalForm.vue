/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Products.productExtend.components.AddProductsBySKUModalForm.title')"
        @close="onClose">
        <template #body>
            <AddProductsBySKUForm
                :product-skus="productSkus"
                :submit-title="$t('@Products.productExtend.components.AddProductsBySKUModalForm.submitTitle')"
                :proceed-title="$t('@Products._.cancel')"
                :is-submitting="isAdding"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                @submit="onSubmit"
                @proceed="onClose"
                @input="onFormValueChange" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import AddProductsBySKUForm from '@Products/extends/components/Forms/AddProductsBySKUForm';
import {
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Products/extends/defaults';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsBySKUModalForm',
    components: {
        AddProductsBySKUForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            productSkus: '',
            isAdding: false,
        };
    },
    methods: {
        ...mapActions('product', [
            'addBySku',
        ]),
        onFormValueChange(value) {
            this.productSkus = value;
        },
        onClose() {
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        onSubmit() {
            if (this.isAdding) {
                return;
            }
            this.isAdding = true;

            this.removeScopeErrors(this.scope);
            this.addBySku({
                scope: this.scope,
                skus: this.productSkus,
                onSuccess: this.onSubmitSuccess,
                onError: this.onAddError,
            });
        },
        onSubmitSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.productExtend.components.AddProductsBySKUModalForm.successMessage'),
            });

            this.isAdding = false;

            if (this.productSkus.length) {
                const event = new CustomEvent(PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME);

                document.documentElement.dispatchEvent(event);
            }

            this.$emit('submitted');

            this.onClose();
        },
        onAddError(errors) {
            this.onError(errors);

            this.isAdding = false;
        },
    },
};
</script>
