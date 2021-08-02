/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Products.productExtend.components.AddProductsFromSegmentModalForm.title')"
        @close="onClose">
        <template #body>
            <AddProductsFromSegmentForm
                :segments="segments"
                :submit-title="$t('@Products.productExtend.components.AddProductsFromSegmentModalForm.submitTitle')"
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
import {
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Products/extends/defaults';
import AddProductsFromSegmentForm from '@Segments/components/Forms/AddProductsFromSegmentForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsFromSegmentModalForm',
    components: {
        AddProductsFromSegmentForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            segments: [],
            isAdding: false,
        };
    },
    methods: {
        ...mapActions('product', [
            'addBySegment',
        ]),
        onFormValueChange(value) {
            this.segments = value;
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
            this.addBySegment({
                scope: this.scope,
                segments: this.segments,
                onSuccess: this.onSubmitSuccess,
                onError: this.onAddError,
            });
        },
        onSubmitSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.productExtend.components.AddProductsFromSegmentModalForm.successMessage'),
            });

            this.isAdding = false;

            const event = new CustomEvent(PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);

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
