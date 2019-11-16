/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <template v-if="user">
            <NavigationBar>
                <template #leftSection>
                    <NavigationBarMenuButton
                        :value="sideBarState"
                        @state="onStateChange" />
                    <NavigationBarDashboardButton />
                </template>
                <template #rightSection>
                    <NavigationBarUserButton />
                    <NavigationBarSynchronizationButton />
                    <NavigationBarNotificationButton />
                </template>
            </NavigationBar>
            <AppContent>
                <SideBar :value="sideBarState" />
                <BasePage>
                    <nuxt />
                </BasePage>
            </AppContent>
            <FlashMessage />
        </template>
    </App>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    middleware: ['setDictionaries', 'authenticated'],
    components: {
        App: () => import('~/components/Layout/App'),
        AppContent: () => import('~/components/Layout/AppContent'),
        BasePage: () => import('~/components/Layout/BasePage'),
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
    mounted() {
        this.setRequestTimeout();
    },
    destroyed() {
        this.invalidateRequestTimeout();
    },
    computed: {
        ...mapState('authentication', {
            user: (state) => state.user,
        }),
    },
    methods: {
        ...mapActions('notifications', [
            'setRequestTimeout',
            'invalidateRequestTimeout',
        ]),
        onStateChange(value) {
            this.sideBarState = value;
        },
    },
};
</script>
