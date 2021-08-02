/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('@ActivityLogs.activityLog._.title')"
            :is-read-only="isReadOnly">
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
            :items="asyncTabs" />
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import PRIVILEGES from '@Users/config/privileges';

export default {
    name: 'UsersTabs',
    mixins: [
        asyncTabsMixin,
        beforeRouteLeaveMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@ActivityLogs/pages/activity-logs/mainAction');
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
};
</script>
