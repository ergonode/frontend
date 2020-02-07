/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create user"
        @close="onClose">
        <template #body>
            <UserForm />
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

const createUser = () => import('@Users/services/createUser.service');

export default {
    name: 'CreateUserModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        UserForm: () => import('@Users/components/Forms/UserForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'User', createRequest: createUser })],
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    created() {
        this.getRoles({
            limit: 9999,
            offset: 0,
        });
    },
    methods: {
        ...mapActions('users', [
            'clearStorage',
        ]),
        ...mapActions('roles', [
            'getRoles',
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
                    name: 'user-edit-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
