/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create product"
        @close="onClose">
        <template #body>
            <ProductForm />
        </template>
        <template #footer>
            <Button
                title="CREATE"
                :disabled="isRequestPending"
                @click.native="onCreate" />
            <Button
                title="CREATE & EDIT"
                :theme="secondaryTheme"
                :disabled="isRequestPending"
                @click.native="onCreatedAndEdit" />
        </template>
    </ModalForm>
</template>

<script>
import { MODAL_ACTION } from '@Core/defaults/modals';
import { THEME } from '@Core/defaults/theme';
import actionModalFormMixin from '@Core/mixins/modals/actionModalFormMixin';
import { mapActions } from 'vuex';

const createProduct = () => import('@Products/services/createProduct.service');

export default {
    name: 'CreateProductModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        ProductForm: () => import('@Products/components/Form/ProductForm'),
    },
    mixins: [actionModalFormMixin({ action: MODAL_ACTION.CREATE, namespace: 'Product', request: createProduct })],
    fetch() {
        this.getSelectAttributes();
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('product', [
            'getSelectAttributes',
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onActionRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onActionRequest((id) => {
                this.$router.push({
                    name: 'product-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
