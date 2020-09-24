/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Profile" />
        <HorizontalRoutingTabBar
            :items="tabs" />
    </Page>
</template>

<script>
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';

export default {
    name: 'UserProfileTabs',
    components: {
        HorizontalRoutingTabBar,
        TitleBar,
        Page,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    computed: {
        tabs() {
            return getNestedTabRoutes({
                hasAccess: this.$hasAccess,
                routes: this.$router.options.routes,
                route: this.$route,
            });
        },
    },
    head() {
        return {
            title: 'Profile - Ergonode',
        };
    },
};
</script>
