/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Users activity logs"
            :is-read-only="$isReadOnly('USER')" />
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
    name: 'UsersTabs',
    components: {
        HorizontalRoutingTabBar,
        TitleBar,
        Page,
    },
    mixins: [
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
};
</script>
