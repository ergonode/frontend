/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create category tree"
        @close="onClose">
        <template #body>
            <CategoryTreeForm />
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

const createCategoryTree = () => import('@Trees/services/createCategoryTree.service');

export default {
    name: 'CreateCategoryTreeModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        CategoryTreeForm: () => import('@Trees/components/Forms/CategoryTreeForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Category tree', createRequest: createCategoryTree })],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('tree', [
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
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
                    name: 'category-tree-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
