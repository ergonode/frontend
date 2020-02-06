/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create attribute group"
        @close="onClose">
        <template #body>
            <AttributeGroupForm />
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

const createAttributeGroupModule = () => import('@Attributes/services/createAttributeGroup.service');

export default {
    name: 'CreateAttributeGroupModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        AttributeGroupForm: () => import('@Attributes/components/Forms/AttributeGroupForm'),
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
        ...mapActions('attribute', [
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

            createAttributeGroupModule().then((response) => {
                response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then(() => {
                    this.isRequestPending = false;
                    this.removeValidationErrors();
                    this.$addAlert({ type: 'success', message: 'Attribute group has been created' });
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

            createAttributeGroupModule().then((response) => {
                response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then(({ id }) => {
                    this.isRequestPending = false;
                    this.removeValidationErrors();
                    this.$addAlert({ type: 'success', message: 'Attribute has been created' });
                    this.$router.push({
                        name: 'attribute-group-edit-id',
                        params: {
                            id,
                        },
                    });
                }).catch((e) => {
                    console.log('dupa');
                    console.log(e);
                    this.isRequestPending = false;
                    this.onError(e.data);
                });
            });
        },
    },
};
</script>
