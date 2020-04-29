/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserRolesPage
        :title="name"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedPrivilegesBasedOnGridData } from '@Users/models/gridDataMapper';
import { ALERT_TYPE } from '@Core/defaults/alerts';

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
            privileges: state => state.privileges,
            description: state => state.description,
            selectedPrivileges: state => state.selectedPrivileges,
        }),
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('roles', [
            'setPrivileges',
            'clearStorage',
            'updateRole',
            'removeRole',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        ...mapActions('grid', [
            'removeDraft',
        ]),
        onRemoveRoleSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Role removed' });
            this.$router.push({ name: 'user-roles-grid' });
        },
        onRemoveRoleError({ message }) {
            this.$addAlert({ type: ALERT_TYPE.ERROR, message });
        },
        onSave() {
            const role = {
                name: this.name,
                description: this.description,
                privileges: getMappedPrivilegesBasedOnGridData({
                    selectedData: this.privileges,
                    drafts: this.drafts,
                }),
            };

            this.updateRole({
                id: this.roleID,
                data: role,
                onSuccess: () => {
                    const privileges = role.privileges
                        .reduce((acc, ele) => ({ ...acc, [ele]: true }), {});

                    this.removeValidationErrors();
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Role updated' });
                    this.setPrivileges(privileges);
                    this.removeDraft();
                },
                onError: this.onError,
            });
        },
        onRemove() {
            const isConfirmed = confirm('Are you sure you want to delete this role?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirmed) {
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
