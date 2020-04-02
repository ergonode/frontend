/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create product template"
        @close="onClose">
        <template #body>
            <TemplateDesignerForm />
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
import { MODAL_ACTION } from '@Core/defaults/modals';
import actionModalFormMixin from '@Core/mixins/modals/actionModalFormMixin';

const createProductTemplate = () => import('@Templates/services/createProductTemplate.service');

export default {
    name: 'CreateProductTemplateModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        TemplateDesignerForm: () => import('@Templates/components/Forms/TemplateDesignerForm'),
    },
    mixins: [actionModalFormMixin({ action: MODAL_ACTION.CREATE, namespace: 'Product template', request: createProductTemplate })],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    created() {
        Promise.all([
            this.getTextAttributes(),
            this.getImageAttributes(),
        ]);
    },
    methods: {
        ...mapActions('templateDesigner', [
            'clearStorage',
            'getTextAttributes',
            'getImageAttributes',
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
                    name: 'product-template-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
