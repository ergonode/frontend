/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserRolesPage
        :title="name"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedPrivilegesBasedOnGridData } from '@Users/models/privilegesMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    name: 'EditUserRoles',
    components: {
        UserRolesPage: () => import('@Users/components/Pages/UserRolesPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('roles/getRoleById', {
            roleId: params.id,
        });
    },
    computed: {
        ...mapState('roles', {
            roleID: state => state.id,
            name: state => state.name,
            description: state => state.description,
            selectedPrivileges: state => state.selectedPrivileges,
        }),
        ...mapState('dictionaries', {
            privileges: state => state.privileges,
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
        },
        onRemoveRoleSuccess() {
            this.$addAlert({ type: 'success', message: 'Role removed' });
            this.$router.push({ name: 'user-roles-grid' });
        },
        onRemoveRoleError({ message }) {
            this.$addAlert({ type: 'error', message });
        },
        onSave() {
            const role = {
                name: this.name,
                description: this.description,
                privileges: getMappedPrivilegesBasedOnGridData(
                    this.privileges,
                    this.selectedPrivileges,
                ),
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
};
</script>
