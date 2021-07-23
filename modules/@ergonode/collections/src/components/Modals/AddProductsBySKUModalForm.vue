/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Collections.collection.components.AddProductsBySKUModalForm.title')"
        @close="onClose">
        <template #body>
            <AddProductsBySKUForm
                :product-skus="productSkus"
                :submit-title="$t('@Collections.collection.components.AddProductsBySKUModalForm.formSubtitle')"
                :proceed-title="$t('@Collections._.cancel')"
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
import AddProductsBySKUForm from '@Collections/components/Forms/AddProductsBySKUForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
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
        ...mapActions('collection', [
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
                message: this.$t('@Collections.collection.components.AddProductsBySKUModalForm.successMessage'),
            });

            this.isAdding = false;

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
