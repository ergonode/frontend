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
        App: () => import('~/core/components/Layout/App'),
        AppContent: () => import('~/core/components/Layout/AppContent'),
        BasePage: () => import('~/core/components/Layout/BasePage'),
        SideBar: () => import('~/core/components/SideBar/SideBar'),
        NavigationBar: () => import('~/core/components/NavigationBar/NavigationBar'),
        NavigationBarMenuButton: () => import('~/core/components/NavigationBar/NavigationBarMenuButton'),
        NavigationBarUserButton: () => import('~/components/NavigationBar/NavigationBarUserButton'),
        NavigationBarDashboardButton: () => import('~/components/NavigationBar/NavigationBarDashboardButton'),
        NavigationBarSynchronizationButton: () => import('~/components/NavigationBar/NavigationBarSynchronizationButton'),
        NavigationBarNotificationButton: () => import('~/components/NavigationBar/NavigationBarNotificationButton'),
        FlashMessage: () => import('~/core/components/Alerts/FlashMessage'),
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
