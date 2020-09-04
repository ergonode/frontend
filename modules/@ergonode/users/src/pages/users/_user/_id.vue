/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserPage
        :title="title"
        @save="onSave" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditUser',
    components: {
        UserPage: () => import('@Users/components/Pages/UserPage'),
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
        await store.dispatch('user/getUser', {
            id: params.id,
        });
    },
    computed: {
        ...mapState('user', {
            firstName: state => state.firstName,
            lastName: state => state.lastName,
        }),
        title() {
            return `${this.firstName} ${this.lastName}`;
        },
    },
    destroyed() {
        this.__clearStorage();
    },
    methods: {
        ...mapActions('user', [
            '__clearStorage',
            'updateUser',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onSave() {
            this.updateUser({
                onError: this.onError,
                onSuccess: () => {
                    this.removeErrors();
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'User updated',
                    });
                },
            });
        },
    },
};
</script>
