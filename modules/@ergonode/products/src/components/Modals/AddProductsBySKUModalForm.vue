/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Add products by SKU"
        @close="onClose">
        <template #body>
            <AddProductsBySKUForm
                :product-skus="productSkus"
                :is-user-allowed-to-update="isUserAllowedToUpdate"
                submit-title="ADD TO PRODUCT"
                proceed-title="CANCEL"
                :is-submitting="isAdding"
                :errors="scopeErrors"
                @submit="onSubmit"
                @proceed="onClose"
                @input="onFormValueChange" />
        </template>
    </ModalForm>
</template>

<script>
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import AddProductsBySKUForm from '@Products/components/Form/AddProductsBySKUForm';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsBySKUModalForm',
    components: {
        AddProductsBySKUForm,
        ModalForm,
    },
    mixins: [
        scopeErrorsMixin,
    ],
    data() {
        return {
            productSkus: '',
            isAdding: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('product', [
            'addBySku',
        ]),
        onFormValueChange(value) {
            this.productSkus = value;
        },
        onClose() {
            this.removeScopeErrors(this.scope);

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
                onSuccess: this.onAddSuccess,
                onError: this.onAddError,
            });
        },
        onAddSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been added',
            });

            this.isAdding = false;

            this.$emit('added');
        },
        onAddError(errors) {
            this.onError(errors);

            this.isAdding = false;
        },
    },
};
</script>
