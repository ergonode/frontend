/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('role.page.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <CreateRoleButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
        <template
            v-for="(modal, index) in extendedModals">
            <Component
                :is="modal.component"
                :key="index"
                v-bind="bindingProps(modal)" />
        </template>
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import CreateRoleButton from '@Users/components/Buttons/CreateRoleButton';
import PRIVILEGES from '@Users/config/privileges';

export default {
    name: 'UsersTabs',
    components: {
        CreateRoleButton,
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
    },
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Users/pages/roles/mainAction');
        },
        extendedModals() {
            return this.$getExtendSlot('@Users/pages/roles/injectModal');
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
            title: this.$t('role.page.head'),
        };
    },
};
</script>
