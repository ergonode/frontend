/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Users activity logs"
            :is-read-only="$isReadOnly('USER')" />
        <HorizontalTabBar :items="tabs" />
    </Page>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    name: 'UsersTabs',
    components: {
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
};
</script>
