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
        <AppMain>
            <slot />
            <FlashMessages />
        </AppMain>
        <ConfirmModal
            v-if="$getModal(modalConfirmType)"
            :type="modalConfirmType" />
    </App>
</template>

<script>
import ToolBarUserButton from '@Core/components/ToolBar/ToolBarUserButton';
import {
    COMPONENTS,
} from '@Core/defaults/extends';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import App from '@UI/components/Layout/App';
import AppMain from '@UI/components/Layout/AppMain';
import SideBar from '@UI/components/SideBar/SideBar';
import ToolBar from '@UI/components/ToolBar/ToolBar';
import ToolBarBreadcrumb from '@UI/components/ToolBar/ToolBarBreadcrumb';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'DefaultLayout',
    components: {
        AppMain,
        App,
        SideBar,
        ToolBar,
        ToolBarUserButton,
        ToolBarBreadcrumb,
        FlashMessages: () => import('@Core/components/FlashMessages/FlashMessages'),
        ConfirmModal: () => import('@UI/components/ConfirmModal/ConfirmModal'),
    },
    data() {
        return {
            breadcrumbs: [],
            isExpandedSideBar: true,
        };
    },
    computed: {
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
    beforeDestroy() {
        this.invalidateRequestTimeout();
    },
    methods: {
        ...mapActions('notification', [
            'setRequestTimeout',
            'invalidateRequestTimeout',
        ]),
        onExpandSideBar(isExpanded) {
            this.isExpandedSideBar = isExpanded;
        },
    },
};
</script>
