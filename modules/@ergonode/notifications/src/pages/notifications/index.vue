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
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';

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
        await store.dispatch('notification/requestForNotifications', {});
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
