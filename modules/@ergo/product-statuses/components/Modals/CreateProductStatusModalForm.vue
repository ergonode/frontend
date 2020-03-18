/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create product status"
        @close="onClose">
        <template #body>
            <ProductStatusForm />
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
import { mapActions } from 'vuex';
import { THEME } from '@Core/defaults/theme';
import createModalFormMixin from '@Core/mixins/modals/createModalFormMixin';

const createProductStatus = () => import('@Statuses/services/createProductStatus.service');

export default {
    name: 'CreateProductStatusModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        ProductStatusForm: () => import('@Statuses/components/Forms/ProductStatusForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Product status', createRequest: createProductStatus })],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('productStatus', [
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onCreateRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onCreateRequest((id) => {
                this.$router.push({
                    name: 'product-status-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
