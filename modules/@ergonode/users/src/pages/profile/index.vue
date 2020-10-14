/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Profile" />
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
    </Page>
</template>

<script>
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';

export default {
    name: 'UserProfileTabs',
    components: {
        HorizontalRoutingTabBar,
        TitleBar,
        Page,
    },
    mixins: [
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    head() {
        return {
            title: 'Profile - Ergonode',
        };
    },
};
</script>
