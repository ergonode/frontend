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
            id: params.id,
        });
    },
    computed: {
        ...mapState('role', {
            name: state => state.name,
        }),
    },
    destroyed() {
        this.__clearStorage();
    },
    methods: {
        ...mapActions('role', [
            '__clearStorage',
            'updateRole',
            'removeRole',
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
            this.updateRole({
                onSuccess: () => {
                    this.removeErrors();
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Role updated',
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
                    onSuccess: this.onRemoveRoleSuccess,
                    onError: this.onRemoveRoleError,
                }),
            });
        },
    },
};
</script>
