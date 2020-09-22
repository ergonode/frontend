/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Settings"
            :is-read-only="$isReadOnly('SETTINGS')" />
        <HorizontalRoutingTabBar
            :items="tabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData"
                    @showModal="onShowModalByType" />
            </template>
        </HorizontalRoutingTabBar>
        <Component
            :is="getModalComponentViaType"
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>

<script>
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';

export default {
    name: 'Settings',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalRoutingTabBar: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBar'),
    },
    mixins: [
        gridModalMixin,
    ],
    data() {
        return {
            modalType: null,
        };
    },
    computed: {
        tabs() {
            return getNestedTabRoutes({
                hasAccess: this.$hasAccess,
                routes: this.$router.options.routes,
                route: this.$route,
            });
        },
        getModalComponentViaType() {
            switch (this.modalType) {
            case 'units':
                return () => import('@Core/components/Modals/CreateUnitModalForm');
            default:
                return null;
            }
        },
    },
    methods: {
        onShowModalByType(type) {
            this.modalType = type;
            this.onShowModal();
        },
    },
    head() {
        return {
            title: 'Settings - Ergonode',
        };
    },
};
</script>
