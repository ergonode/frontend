/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserPage :title="title" />
</template>

<script>
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
        await store.dispatch('user/getUser', params);
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
    beforeDestroy() {
        this.__clearStorage();
        this.removeErrors();
    },
    methods: {
        ...mapActions('user', [
            '__clearStorage',
        ]),
        ...mapActions('validations', [
            'removeErrors',
        ]),
    },
};
</script>
