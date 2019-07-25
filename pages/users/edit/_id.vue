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

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditUser',
    middleware: ['tab/redirectToUserGeneral'],
    components: {
        UserPage: () => import('~/components/Pages/UserPage'),
    },
    computed: {
        ...mapState('users', {
            id: state => state.id,
            avatarId: state => state.avatarId,
            email: state => state.email,
            firstName: state => state.firstName,
            lastName: state => state.lastName,
            language: state => state.language,
            password: state => state.password,
            passwordRepeat: state => state.passwordRepeat,
            status: state => state.status,
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
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/users');
        },
        onUpdateUserSuccess() {
            this.removeValidationErrors();
            this.$addAlert(this.$store, { type: 'success', message: 'User updated' });
            this.$router.push('/users');
        },
        onSave() {
            const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
                passwordRepeat: this.passwordRepeat,
                language: this.language,
                // status: this.status, TODO: Uncomment when BE is ready
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
        error,
    }) {
        await store.dispatch('users/getUserById', {
            userId: params.id,
            onError: (err) => {
                if (err.response && err.response.status === 404) {
                    return error({ statusCode: 404, message: err.message });
                }
                return error();
            },
        });
    },
};
</script>
