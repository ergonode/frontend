/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Users activity logs"
            :is-read-only="$isReadOnly('USER')" />
        <UsersActivityLogsGridTab />
    </Page>
</template>

<script>
import { THEMES, SIZES } from '@Core/defaults/buttons';
import gridModule from '@Core/reusableStore/grid/state';

export default {
    name: 'UsersTabs',
    components: {
        UsersActivityLogsGridTab: () => import('@ActivityLogs/components/Tabs/UsersActivityLogsGridTab'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'usersActivityLogsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('usersActivityLogsGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'usersActivityLogsGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/accounts/log`;
        await store.dispatch('usersActivityLogsGrid/getData', gridPath);
    },
};
</script>
