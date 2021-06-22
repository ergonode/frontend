/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab :previous-route="previousRoute" />
            </template>
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'EditUser',
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('user/getUser', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Users.user.pages.id.getRequest'),
                });
            },
        });
    },
    computed: {
        ...mapState('user', [
            'firstName',
            'lastName',
        ]),
        title() {
            return `${this.firstName} ${this.lastName}`;
        },
        extendedMainAction() {
            return this.$getExtendSlot('@Users/pages/users/_user/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.USER.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.USER,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.title} - ${this.$t('@Users.user._.headTitle')}`,
        };
    },
};
</script>
