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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditUserRoles',
    components: {
        UserRolesPage: () => import('@Users/components/Pages/UserRolesPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('role/getRole', {
            roleId: params.id,
        });
    },
    computed: {
        ...mapState('role', {
            roleID: state => state.id,
            name: state => state.name,
            privileges: state => state.privileges,
            drafts: state => state.drafts,
            description: state => state.description,
        }),
    },
    destroyed() {
        this.__clearStorage();
    },
    methods: {
        ...mapActions('role', [
            '__clearStorage',
            '__setState',
            'updateRole',
            'removeRole',
            'setPrivileges',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onRemoveRoleSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Role removed',
            });
            this.$router.push({
                name: 'user-roles-grid',
            });
        },
        onRemoveRoleError({
            message,
        }) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message,
            });
        },
        onSave() {
            const privileges = {
                ...this.privileges,
            };

            Object.keys(this.drafts).forEach((key) => {
                const [
                    rowId,
                    columnId,
                ] = key.split('/');

                if (this.drafts[key]) {
                    privileges[`${rowId}_${columnId.toUpperCase()}`] = true;
                } else {
                    delete privileges[`${rowId}_${columnId.toUpperCase()}`];
                }
            });

            const role = {
                name: this.name,
                description: this.description,
                privileges: Object.keys(privileges),
            };

            this.updateRole({
                id: this.roleID,
                data: role,
                onSuccess: () => {
                    this.removeErrors();
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Role updated',
                    });

                    this.setPrivileges(privileges);
                    this.__setState({
                        key: 'drafts',
                        value: {},
                    });
                },
                onError: this.onError,
            });
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this role?',
                confirmCallback: () => this.removeRole({
                    id: this.roleID,
                    onSuccess: this.onRemoveRoleSuccess,
                    onError: this.onRemoveRoleError,
                }),
            });
        },
    },
};
</script>
