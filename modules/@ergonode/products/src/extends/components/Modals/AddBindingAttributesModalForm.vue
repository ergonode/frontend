/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Products.productExtend.components.AddBindingAttributesModalForm.title')"
        @close="onClose">
        <template #body>
            <ProductAttributesBindingForm
                :submit-title="$t('@Products.productExtend.components.AddBindingAttributesModalForm.submitTitle')"
                :proceed-title="$t('@Products._.cancel')"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                :bindings="localBindings"
                @input="onFormValueChange"
                @submit="onSubmit"
                @proceed="onCancel" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import ProductAttributesBindingForm
    from '@Products/extends/components/Forms/ProductAttributesBindingForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AddBindingAttributesModalForm',
    components: {
        ProductAttributesBindingForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            localBindings: [],
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('product', [
            'id',
            'bindings',
        ]),
    },
    created() {
        this.localBindings = [
            ...this.bindings,
        ];
    },
    methods: {
        ...mapActions('product', [
            'addProductBindings',
            '__setState',
        ]),
        onFormValueChange(value) {
            this.localBindings = value;
        },
        onClose() {
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        onCancel() {
            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            if (!this.localBindings.length && !this.bindings.length) {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: this.$t('@Products.productExtend.components.AddBindingAttributesModalForm.infoMessage'),
                });
            } else if (!arraysAreEqual(this.localBindings, this.bindings)) {
                this.isSubmitting = true;

                this.removeScopeErrors(this.scope);
                this.addProductBindings({
                    scope: this.scope,
                    bindings: this.localBindings,
                    onSuccess: this.onCreateSuccess,
                    onError: this.onCreateError,
                });
            } else {
                this.onClose();
            }
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.productExtend.components.AddBindingAttributesModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.__setState({
                key: 'bindings',
                value: this.localBindings,
            });

            this.$emit('added');
            this.onClose();
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
