/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ProductForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="errors"
                :changed-values="changeValues"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import ProductForm from '@Products/components/Forms/ProductForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductGeneralTab',
    components: {
        ProductForm,
        CenterViewTemplate,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('product', [
            'updateProduct',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateProduct({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product has been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
