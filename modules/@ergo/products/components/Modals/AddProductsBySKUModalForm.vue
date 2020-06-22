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
                @input="onFormValueChange" />
        </template>
        <template #footer>
            <Button
                title="ADD TO PRODUCT"
                :disabled="isRequestPending"
                @click.native="onAdd" />
            <Button
                title="CANCEL"
                :theme="secondaryTheme"
                @click.native="onClose" />
        </template>
    </ModalForm>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { THEME } from '@Core/defaults/theme';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'AddProductsBySKUModalForm',
    components: {
        AddProductsBySKUForm: () => import('@Products/components/Form/AddProductsBySKUForm'),
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    data() {
        return {
            productSkus: '',
            isRequestPending: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('product', {
            id: state => state.id,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onFormValueChange(value) {
            this.productSkus = value;
        },
        onClose() {
            this.$emit('close');
        },
        onAdd() {
            this.removeValidationErrors();
            const data = {
                skus: this.productSkus,
            };

            this.isRequestPending = true;
            this.$axios.$post(`${this.language}/products/${this.id}/children/add-from-skus`, data).then(() => {
                this.isRequestPending = false;
                this.removeValidationErrors();
                this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Products has been added' });

                this.$emit('added');
            }).catch((e) => {
                this.isRequestPending = false;
                this.onError(e.data);
            });
        },
    },
};
</script>
