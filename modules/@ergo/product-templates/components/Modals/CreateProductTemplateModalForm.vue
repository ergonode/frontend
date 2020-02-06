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

const createProductTemplateModule = () => import('@Templates/services/createProductTemplate.service');

export default {
    name: 'CreateProductTemplateModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        TemplateDesignerForm: () => import('@Templates/components/Forms/TemplateDesignerForm'),
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isRequestPending: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
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
        onCreated() {
            this.isRequestPending = true;
            this.removeValidationErrors();

            createProductTemplateModule().then((response) => {
                response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then(() => {
                    this.isRequestPending = false;
                    this.removeValidationErrors();
                    this.$addAlert({ type: 'success', message: 'Product template has been created' });
                    this.clearStorage();
                    this.$emit('created');
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                });
            });
        },
        onCreatedAndEdit() {
            this.isRequestPending = true;
            this.removeValidationErrors();

            createProductTemplateModule().then((response) => {
                response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then(({ id }) => {
                    this.isRequestPending = false;
                    this.removeValidationErrors();
                    this.$addAlert({ type: 'success', message: 'Product template has been created' });
                    this.$router.push({
                        name: 'product-template-edit-id-general',
                        params: {
                            id,
                        },
                    });
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                });
            });
        },
    },
};
</script>
