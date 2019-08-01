/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserRolesPage
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
    name: 'EditUserRoles',
    middleware: ['tab/redirectToUserRolesGeneral'],
    components: {
        UserRolesPage: () => import('~/components/Pages/UserRolesPage'),
    },
    computed: {
        ...mapState('roles', {
            roleID: state => state.id,
            name: state => state.name,
            description: state => state.description,
            privileges: state => state.privileges,
        }),
        title() {
            return `Role: ${this.name}`;
        },
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('roles', [
            'clearStorage',
            'updateRole',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/users/roles');
        },
        onUpdateRoleSuccess() {
            this.removeValidationErrors();
            this.$addAlert(this.$store, { type: 'success', message: 'Role updated' });
            this.$router.push('/users/roles');
        },
        onSave() {
            const role = {
                name: this.name,
                description: this.description,
                privileges: this.privileges,
            };
            this.updateRole({
                id: this.roleID,
                data: role,
                onSuccess: this.onUpdateRoleSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({
        store,
        params,
        error,
    }) {
        await store.dispatch('roles/getRoleById', {
            roleId: params.id,
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
