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
                @input="onFormValueChange" />
        </template>
        <template #footer>
            <Button
                title="ADD TO COLLECTION"
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
import PRIVILEGES from '@Collections/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsBySKUModalForm',
    components: {
        AddProductsBySKUForm: () => import('@Products/components/Form/AddProductsBySKUForm'),
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Button/Button'),
    },
    data() {
        return {
            productSkus: '',
            isRequestPending: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        ...mapActions('collection', [
            'addBySku',
        ]),
        onFormValueChange(value) {
            this.productSkus = value;
        },
        onClose() {
            this.$emit('close');
        },
        onAdd() {
            this.removeErrors();

            this.isRequestPending = true;
            this.addBySku({
                skus: this.productSkus,
            }).then(() => {
                this.isRequestPending = false;
                this.removeErrors();
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: 'Products has been added to collection',
                });

                this.$emit('added');
            }).catch((e) => {
                this.isRequestPending = false;
                this.onError(e.data);
            });
        },
    },
};
</script>
