/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserPage :title="title" />
</template>

<script>
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import UserPage from '@Users/components/Pages/UserPage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditUser',
    components: {
        UserPage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
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
        ...mapState('user', [
            'firstName',
            'lastName',
        ]),
        title() {
            return `${this.firstName} ${this.lastName}`;
        },
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('user', [
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
};
</script>
