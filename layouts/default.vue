/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <NavigationBar>
            <template slot="leftSectionContent">
                <NavigationBarMenuButton
                    :value="sideBarState"
                    @state="onStateChange" />
                <NavigationBarDashboardButton />
            </template>
            <template slot="rightSectionContent">
                <NavigationBarUserButton />
                <NavigationBarSynchronizationButton />
                <NavigationBarNotificationButton />
            </template>
        </NavigationBar>
        <Content>
            <SideBar :value="sideBarState" />
            <nuxt class="nuxt-container" />
            <FlashMessage />
        </Content>
    </App>
</template>

<script>

export default {
    middleware: ['setDictionaries', 'authenticated'],
    components: {
        App: () => import('~/components/Layout/App'),
        Content: () => import('~/components/Layout/Content'),
        SideBar: () => import('~/components/Navigation//SideBar/SideBar'),
        NavigationBar: () => import('~/components/Navigation/NavigationBar/NavigationBar'),
        NavigationBarMenuButton: () => import('~/components/Navigation/NavigationBar/NavigationBarMenuButton'),
        NavigationBarUserButton: () => import('~/components/Navigation/NavigationBar/NavigationBarUserButton'),
        NavigationBarDashboardButton: () => import('~/components/Navigation/NavigationBar/NavigationBarDashboardButton'),
        NavigationBarSynchronizationButton: () => import('~/components/Navigation/NavigationBar/NavigationBarSynchronizationButton'),
        NavigationBarNotificationButton: () => import('~/components/Navigation/NavigationBar/NavigationBarNotificationButton'),
        FlashMessage: () => import('~/components/Alerts/FlashMessage'),
    },
    data() {
        return {
            sideBarState: 2,
        };
    },
    methods: {
        onStateChange(value) {
            this.sideBarState = value;
        },
    },
};
</script>
<style lang="scss">
    .nuxt-container {
        flex: 1;
    }
</style>
