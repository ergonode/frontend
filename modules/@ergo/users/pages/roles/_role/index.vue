/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserRolesPage
        title="New Role"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    name: 'NewUserRoles',
    components: {
        UserRolesPage: () => import('@Users/components/Pages/UserRolesPage'),
    },
    computed: {
        ...mapState('roles', {
            roleID: (state) => state.id,
            name: (state) => state.name,
            description: (state) => state.description,
            privileges: (state) => state.privileges,
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
            this.$router.push(getParentRoutePath(this.$route));
        },
        onCreateRoleSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Role created' });
            this.$router.push({
                name: 'user-role-edit-id-general',
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
