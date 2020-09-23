/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Notifications" />
        <HorizontalRoutingTabBar :items="tabs" />
    </Page>
</template>

<script>
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';

export default {
    name: 'NotificationTabs',
    components: {
        HorizontalRoutingTabBar,
        TitleBar,
        Page,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    async fetch({
        store,
    }) {
        await store.dispatch('notification/requestForNotifications');
    },
    computed: {
        tabs() {
            return [
                {
                    title: 'Notifications',
                    route: {
                        name: 'notifications-grid',
                    },
                },
            ];
        },
    },
    head() {
        return {
            title: 'Notifications - Ergonode',
        };
    },
};
</script>
