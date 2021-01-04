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
        <NavigationSideBar @expand="onExpandNavigationSideBar" />
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
import NavigationSideBar from '@UI/components/NavigationSideBar/NavigationSideBar';
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
        NavigationSideBar,
        ToolBar,
        ToolBarUserButton,
        ToolBarBreadcrumb,
        FlashMessages: () => import('@Core/components/FlashMessages/FlashMessages'),
    },
    data() {
        return {
            executingBatchActions: {},
            breadcrumbs: [],
            isExpandedNavigationSideBar: true,
        };
    },
    computed: {
        ...mapState('core', [
            'modals',
        ]),
        ...mapState('batchAction', [
            'batchActions',
        ]),
        navigationBarPosition() {
            return {
                top: 0,
                left: this.isExpandedNavigationSideBar ? '256px' : '80px',
                right: 0,
            };
        },
        extendedComponents() {
            return this.$getExtendSlot(COMPONENTS.NAVIGATION_BAR);
        },
    },
    watch: {
        $route() {
            this.breadcrumbs = this.$route.meta.breadcrumbs || [];
        },
        batchActions() {
            const request = [];

            this.batchActions.forEach(({
                id,
                href,
                type,
                payload,
            }) => {
                if (!this.executingBatchActions[id]) {
                    let event = null;

                    this.executingBatchActions[id] = true;

                    request.push(
                        this.$axios.$post(href, {
                            type,
                            ...payload,
                        }).then(() => {
                            event = new CustomEvent(id, {
                                detail: {
                                    id,
                                    payload,
                                },
                            });
                        }).catch((error) => {
                            event = new CustomEvent(id, {
                                detail: {
                                    id,
                                    error,
                                },
                            });
                        }).finally(() => {
                            delete this.executingBatchActions[id];

                            document.documentElement.dispatchEvent(event);
                        }),
                    );
                }
            });

            Promise.all(request);
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
        onExpandNavigationSideBar(isExpanded) {
            this.isExpandedNavigationSideBar = isExpanded;
        },
    },
};
</script>
