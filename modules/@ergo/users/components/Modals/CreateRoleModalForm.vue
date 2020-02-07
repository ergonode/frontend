/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create role"
        @close="onClose">
        <template #body>
            <UserRoleForm />
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

const createRole = () => import('@Users/services/createRole.service');

export default {
    name: 'CreateRoleModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        UserRoleForm: () => import('@Users/components/Forms/UserRoleForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Role', createRequest: createRole })],
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('roles', [
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
                    name: 'user-role-edit-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
