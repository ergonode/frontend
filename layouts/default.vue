/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <div class="app-content">
            <div class="app-content__navigation-bar">
                <NavigationBar>
                    <template #breadcrumbs>
                        <NavigationBarBreadcrumb
                            v-for="(breadcrumb, index) in breadcrumbs"
                            :key="index"
                            :breadcrumb="breadcrumb" />
                    </template>
                    <template #actions>
                        <NavigationBarUserButton />
                        <NavigationBarNotificationButton />
                    </template>
                </NavigationBar>
            </div>
            <div class="app-content__navigation-side-bar">
                <SideBar />
            </div>
            <div class="app-content__body">
                <nuxt />
                <FlashMessage />
            </div>
        </div>
    </App>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    middleware: ['setDictionaries', 'authenticated'],
    components: {
        App: () => import('~/core/components/Layout/App'),
        SideBar: () => import('~/core/components/SideBar/SideBar'),
        NavigationBar: () => import('~/core/components/NavigationBar/NavigationBar'),
        NavigationBarBreadcrumb: () => import('~/core/components/NavigationBar/NavigationBarBreadcrumb'),
        NavigationBarUserButton: () => import('~/components/NavigationBar/NavigationBarUserButton'),
        NavigationBarNotificationButton: () => import('~/components/NavigationBar/NavigationBarNotificationButton'),
        FlashMessage: () => import('~/core/components/Alerts/FlashMessage'),
    },
    data() {
        return {
            breadcrumbs: [],
        };
    },
    created() {
        this.breadcrumbs = this.$route.meta.breadcrumbs || [];
    },
    mounted() {
        this.setRequestTimeout();
    },
    destroyed() {
        this.invalidateRequestTimeout();
    },
    watch: {
        $route() {
            this.breadcrumbs = this.$route.meta.breadcrumbs || [];
        },
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

<style lang="scss" scoped>
    .app-content {
        display: grid;
        grid-template-columns: max-content auto;
        grid-template-rows: 48px auto;
        flex: 1;

        &__navigation-bar {
            grid-area: 1 / 2 / 1 / 3;
        }

        &__navigation-side-bar {
            grid-row: 1 / 3;
        }

        &__body {
            grid-area: 2 / 2 / 3 / 3;
        }
    }
</style>
