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

const createUser = () => import('@Users/services/createUser.service');

export default {
    name: 'CreateUserModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        UserForm: () => import('@Users/components/Forms/UserForm'),
    },
    mixins: [actionModalFormMixin({ action: MODAL_ACTION.CREATE, namespace: 'User', request: createUser })],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
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
        onCreate() {
            this.onActionRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onActionRequest((id) => {
                this.$router.push({
                    name: 'user-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
