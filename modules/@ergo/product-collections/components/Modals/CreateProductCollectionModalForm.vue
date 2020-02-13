/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create product collection"
        @close="onClose">
        <template #body>
            <ProductCollectionForm />
        </template>
        <template #footer>
            <Button
                title="CREATE"
                :disabled="isRequestPending"
                @click.native="onCreated" />
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

const createProductCollection = () => import('@Collections/services/createProductCollection.service');

export default {
    name: 'CreateProductCollectionModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        ProductCollectionForm: () => import('@Collections/components/Forms/ProductCollectionForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Product collection', createRequest: createProductCollection })],
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('productCollection', [
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreated() {
            this.onCreate(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onCreate((id) => {
                this.$router.push({
                    name: 'product-collection-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
