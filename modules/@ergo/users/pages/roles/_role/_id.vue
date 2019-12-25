/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserRolesPage
        :title="name"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedPrivilegesBasedOnGridData } from '@Users/models/privilegesMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditUserRoles',
    components: {
        UserRolesPage: () => import('@Users/components/Pages/UserRolesPage'),
    },
    computed: {
        ...mapState('roles', {
            roleID: (state) => state.id,
            name: (state) => state.name,
            description: (state) => state.description,
        }),
        ...mapState('data', {
            privileges: (state) => state.privileges,
        }),
        ...mapState('authentication', {
            userPrivileges: (state) => state.user.privileges,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('roles', [
            'clearStorage',
            'updateRole',
            'removeRole',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onUpdateRoleSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Role updated' });
            this.$router.push({ name: 'user-roles' });
        },
        onRemoveRoleSuccess() {
            this.$addAlert({ type: 'success', message: 'Role removed' });
            this.$router.push({ name: 'user-roles' });
        },
        onRemoveRoleError({ message }) {
            this.$addAlert({ type: 'error', message });
        },
        onSave() {
            const { privilegesGrid } = this.$store.state;
            const privileges = privilegesGrid
                ? getMappedPrivilegesBasedOnGridData(this.privileges, privilegesGrid.cellValues)
                : this.userPrivileges;
            const role = {
                name: this.name,
                description: this.description,
                privileges,
            };

            this.updateRole({
                id: this.roleID,
                data: role,
                onSuccess: this.onUpdateRoleSuccess,
                onError: this.onError,
            });
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this role?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeRole({
                    id: this.roleID,
                    onSuccess: this.onRemoveRoleSuccess,
                    onError: this.onRemoveRoleError,
                });
            }
        },
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('roles/getRoleById', {
            roleId: params.id,
        });
    },
};
</script>
