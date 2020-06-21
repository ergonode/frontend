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
                        <template v-for="(component, index) in extendedComponents">
                            <Component
                                :is="component.component"
                                :key="index"
                                v-bind="component.props" />
                        </template>
                    </template>
                </NavigationBar>
            </div>
            <div class="app-content__navigation-side-bar">
                <SideBar />
            </div>
            <div class="app-content__body">
                <slot />
                <FlashMessage />
                <ConfirmModal
                    v-if="$getModal(modalConfirmType)"
                    :type="modalConfirmType" />
            </div>
        </div>
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
        NavigationBar: () => import('@Core/components/NavigationBar/NavigationBar'),
        NavigationBarBreadcrumb: () => import('@Core/components/NavigationBar/NavigationBarBreadcrumb'),
        NavigationBarUserButton: () => import('@Core/components/NavigationBar/NavigationBarUserButton'),
        FlashMessage: () => import('@Core/components/Alerts/FlashMessage'),
        ConfirmModal: () => import('@Core/components/Modals/ConfirmModal'),
    },
    data() {
        return {
            breadcrumbs: [
            ],
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        extendedComponents() {
            return this.$getExtendedComponents(COMPONENTS.NAVIGATION_BAR);
        },
        modalConfirmType() {
            return MODAL_TYPE.GLOBAL_CONFIRM_MODAL;
        },
    },
    watch: {
        $route() {
            this.breadcrumbs = this.$route.meta.breadcrumbs || [
            ];
        },
    },
    created() {
        this.breadcrumbs = this.$route.meta.breadcrumbs || [
        ];
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
