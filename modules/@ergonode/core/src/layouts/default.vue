/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
                <template v-for="(component, index) in extendedToolBar">
                    <Component
                        :is="component.component"
                        :key="index"
                        v-bind="component.props" />
                </template>
            </template>
        </ToolBar>
        <NavigationSideBar @expand="onExpandNavigationSideBar" />
        <AppMain>
            <slot />
            <template v-for="(component, index) in extendedAppMain">
                <Component
                    :is="component.component"
                    :key="index"
                    v-bind="component.props" />
            </template>
            <FlashMessages />
        </AppMain>
        <Component
            v-for="(modal, index) in modals"
            :key="index"
            :is="modal.component"
            :index="index"
            v-bind="modal.props"
            @close="onCloseModal" />
    </App>
</template>

<script>
import ToolBarUserButton from '@Core/components/ToolBar/ToolBarUserButton';
import App from '@UI/components/Layout/App';
import AppMain from '@UI/components/Layout/AppMain';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'DefaultLayout',
    components: {
        AppMain,
        App,
        ToolBarUserButton,
        FlashMessages: () => import('@Core/components/FlashMessages/FlashMessages'),
    },
    data() {
        return {
            breadcrumbs: [],
            isExpandedNavigationSideBar: true,
        };
    },
    computed: {
        ...mapState('core', [
            'modals',
        ]),
        navigationBarPosition() {
            return {
                top: 0,
                left: this.isExpandedNavigationSideBar ? '256px' : '80px',
                right: 0,
            };
        },
        extendedToolBar() {
            return this.$getExtendSlot('@Core/layouts/default/toolBar');
        },
        extendedAppMain() {
            return this.$getExtendSlot('@Core/layouts/default/appMain');
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
    methods: {
        ...mapActions('core', [
            'removeModal',
        ]),
        onCloseModal(index) {
            this.removeModal(index);
        },
        onExpandNavigationSideBar(isExpanded) {
            this.isExpandedNavigationSideBar = isExpanded;
        },
    },
};
</script>
