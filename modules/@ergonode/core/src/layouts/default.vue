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
import {
    COMPONENTS,
} from '@Core/defaults/extends';
import App from '@UI/components/Layout/App';
import AppMain from '@UI/components/Layout/AppMain';
import SideBar from '@UI/components/SideBar/SideBar';
import ToolBar from '@UI/components/ToolBar/ToolBar';
import ToolBarBreadcrumb from '@UI/components/ToolBar/ToolBarBreadcrumb';
import {
    mapActions,
    mapState,
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
    },
    data() {
        return {
            executingBulkActions: {},
            breadcrumbs: [],
            isExpandedSideBar: true,
        };
    },
    computed: {
        ...mapState('core', [
            'modals',
        ]),
        ...mapState('bulkAction', [
            'bulkActions',
        ]),
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
    },
    watch: {
        $route() {
            this.breadcrumbs = this.$route.meta.breadcrumbs || [];
        },
        bulkActions() {
            this.bulkActions.forEach(({
                id,
                payload,
            }) => {
                // TODO: Add support for axios request

                if (!this.executingBulkActions[id]) {
                    setTimeout(() => {
                        const event = new CustomEvent(id, {
                            detail: {
                                id,
                                payload,
                            },
                        });

                        this.executingBulkActions[id] = true;

                        document.documentElement.dispatchEvent(event);
                    }, 5000);
                }
            });
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
        ...mapActions('core', [
            'removeModal',
        ]),
        ...mapActions('notification', [
            'setRequestTimeout',
            'invalidateRequestTimeout',
        ]),
        onCloseModal(index) {
            this.removeModal(index);
        },
        onExpandSideBar(isExpanded) {
            this.isExpandedSideBar = isExpanded;
        },
    },
};
</script>
