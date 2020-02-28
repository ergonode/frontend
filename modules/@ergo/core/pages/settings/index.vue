/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar title="Settings" />
        <HorizontalTabBar
            :items="tabs" />
    </Page>
</template>

<script>
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    name: 'Settings',
    components: {
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
    },
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    head() {
        return {
            title: 'Settings - Ergonode',
        };
    },
};
</script>
