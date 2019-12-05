/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserPage
        :title="title"
        is-edit
        @dismiss="onDismiss"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '~/model/navigation/tabs';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditUser',
    components: {
        UserPage: () => import('~/components/Pages/UserPage'),
    },
    computed: {
        ...mapState('authentication', {
            user: (state) => state.user,
        }),
        ...mapState('users', {
            id: (state) => state.id,
            avatarId: (state) => state.avatarId,
            email: (state) => state.email,
            firstName: (state) => state.firstName,
            lastName: (state) => state.lastName,
            language: (state) => state.language,
            password: (state) => state.password,
            passwordRepeat: (state) => state.passwordRepeat,
            isActive: (state) => state.isActive,
            roleId: (state) => state.roleId,
        }),
        title() {
            return `${this.firstName} ${this.lastName}`;
        },
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('users', [
            'clearStorage',
            'updateUser',
        ]),
        ...mapActions('authentication', [
            'getUser',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onUpdateUserSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'User updated' });
            this.$router.push('/users');

            // TODO: Along Notification introduce - remove it from it - this solution is preventing from relogging to see newly edited data for user if edited user is logged one
            if (this.user.id === this.id) {
                this.getUser();
            }
        },
        onSave() {
            const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                language: this.language,
                password: this.password,
                passwordRepeat: this.passwordRepeat,
                roleId: this.roleId,
                isActive: this.isActive,
            };
            this.updateUser({
                id: this.id,
                data: user,
                avatarId: this.avatarId,
                onSuccess: this.onUpdateUserSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('roles/getRoles', {
            limit: 9999,
            offset: 0,
        });
        await store.dispatch('users/getUserById', {
            userId: params.id,
        });
    },
};
</script>
