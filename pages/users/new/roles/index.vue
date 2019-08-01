/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserRolesPage
        :title="title"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    name: 'NewUserRoles',
    middleware: ['tab/redirectToUserRolesGeneral'],
    components: {
        UserRolesPage: () => import('~/components/Pages/UserRolesPage'),
    },
    data: () => ({
        title: 'New user role',
    }),
    computed: {
        ...mapState('roles', {
            roleID: state => state.id,
            name: state => state.name,
            description: state => state.description,
            privileges: state => state.privileges,
        }),
    },
    created() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('roles', [
            'createRole',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/users/roles');
        },
        onCreateRoleSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert(this.$store, { type: 'success', message: 'Role created' });
            this.$router.push({
                name: 'users-roles-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            const role = {
                name: this.name,
                description: this.description,
                privileges: this.privileges,
            };
            this.createRole({
                data: role,
                onSuccess: this.onCreateRoleSuccess,
                onError: this.onError,
            });
        },
    },
};
</script>
