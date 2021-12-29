/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="name"
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
                <RemoveRoleButton />
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
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import RemoveRoleButton from '@Roles/components/Buttons/RemoveRoleButton';
import PRIVILEGES from '@Roles/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'EditUserRoles',
    components: {
        RemoveRoleButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
        beforeRouteUpdateMixin,
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
        await store.dispatch('role/getRole', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Roles.role.pages.id.getRequest'),
                });
            },
        });
    },
    computed: {
        ...mapState('role', [
            'name',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Roles/pages/roles/_role/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.USER_ROLE.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.USER_ROLE,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.name} - ${this.$t('@Roles.role._.headTitle')}`,
        };
    },
};
</script>
