/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <ToolBar />
        <Content>
            <SideBarMenu />
            <nuxt class="nuxt-container" />
            <FlashMessage />
        </Content>
    </App>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    middleware: ['setDictionaries', 'authenticated'],
    components: {
        App: () => import('~/components/Layout/App'),
        Content: () => import('~/components/Layout/Content'),
        SideBarMenu: () => import('~/components/Navigation/SideBar/SideBarMenu'),
        ToolBar: () => import('~/components/Navigation/ToolBar/ToolBar'),
        FlashMessage: () => import('~/components/Alerts/FlashMessage'),
    },
    beforeMount() {
        if (localStorage.sideBarState) {
            this.setSideBarState(parseInt(localStorage.sideBarState, 10));
        }
    },
    methods: {
        ...mapActions('settings', [
            'setSideBarState',
        ]),
    },
};
</script>
<style lang="scss">
    .nuxt-container {
        flex: 1;
    }
</style>
