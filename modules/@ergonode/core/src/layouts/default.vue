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
                <template v-for="(component, index) in extendedNavigationBar">
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
import {
    create,
} from '@BatchActions/services';
import ToolBarUserButton from '@Core/components/ToolBar/ToolBarUserButton';
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
        extendedNavigationBar() {
            return this.$getExtendSlot('@Core/layouts/default/navigationBar');
        },
    },
    watch: {
        $route() {
            this.breadcrumbs = this.$route.meta.breadcrumbs || [];
        },
        batchActions() {
            const requests = [];

            this.batchActions.forEach(({
                id,
                request,
            }) => {
                if (!this.executingBatchActions[id]) {
                    let event = null;

                    this.executingBatchActions[id] = true;

                    requests.push(
                        create({
                            $axios: this.$axios,
                            ...request,
                        }).then(() => {
                            event = new CustomEvent(id, {
                                detail: {
                                    id,
                                    request,
                                },
                            });
                        }).catch((error) => {
                            event = new CustomEvent(id, {
                                detail: {
                                    id,
                                    request,
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

            Promise.all(requests);
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
