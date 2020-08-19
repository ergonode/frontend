/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <ToolBar :style="navigationBarPosition">
            <template #breadcrumbs>
                <ToolBarBreadcrumb
                    v-for="(breadcrumb, index) in breadcrumbs"
                    :key="index"
                    :breadcrumb="breadcrumb" />
            </template>
            <template #actions>
                <ToolBarUserButton />
                <template v-for="(component, index) in extendedComponents">
                    <Component
                        :is="component.component"
                        :key="index"
                        v-bind="component.props" />
                </template>
            </template>
        </ToolBar>
        <SideBar @expand="onExpandSideBar" />
        <main class="app-main">
            <slot />
            <FlashMessage />
            <ConfirmModal
                v-if="$getModal(modalConfirmType)"
                :type="modalConfirmType" />
        </main>
    </App>
</template>

<script>
import {
    COMPONENTS,
} from '@Core/defaults/extends';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'DefaultLayout',
    components: {
        App: () => import('@Core/components/Layout/App'),
        SideBar: () => import('@Core/components/SideBar/SideBar'),
        ToolBar: () => import('@Core/components/ToolBar/ToolBar'),
        ToolBarBreadcrumb: () => import('@Core/components/ToolBar/ToolBarBreadcrumb'),
        ToolBarUserButton: () => import('@Core/components/ToolBar/ToolBarUserButton'),
        FlashMessage: () => import('@Core/components/Alerts/FlashMessage'),
        ConfirmModal: () => import('@Core/components/Modals/ConfirmModal'),
    },
    data() {
        return {
            breadcrumbs: [],
            isExpandedSideBar: true,
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        navigationBarPosition() {
            return {
                top: 0,
                left: this.isExpandedSideBar ? '256px' : '80px',
                right: 0,
            };
        },
        extendedComponents() {
            return this.$getExtendedComponents(COMPONENTS.NAVIGATION_BAR);
        },
        modalConfirmType() {
            return MODAL_TYPE.GLOBAL_CONFIRM_MODAL;
        },
    },
    watch: {
        $route() {
            this.breadcrumbs = this.$route.meta.breadcrumbs || [];
        },
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
    methods: {
        ...mapActions('notifications', [
            'setRequestTimeout',
            'invalidateRequestTimeout',
        ]),
        onExpandSideBar(isExpanded) {
            this.isExpandedSideBar = isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .app-main {
        width: 100%;
        height: 100vh;
        padding: 48px 0 0;
        box-sizing: border-box;
    }
</style>
