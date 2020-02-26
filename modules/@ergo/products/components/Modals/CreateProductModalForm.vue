/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create product template"
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
import { mapActions } from 'vuex';
import { THEMES } from '@Core/defaults/buttons';
import createModalFormMixin from '@Core/mixins/modals/createModalFormMixin';

const createProduct = () => import('@Products/services/createProduct.service');

export default {
    name: 'CreateProductModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        ProductForm: () => import('@Products/components/Forms/ProductForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Product', createRequest: createProduct })],
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    created() {
        Promise.all([
            this.getTemplates(),
            this.getCategories(),
        ]);
    },
    methods: {
        ...mapActions('productsDraft', [
            'getTemplates',
            'getCategories',
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
