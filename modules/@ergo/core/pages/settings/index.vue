/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Settings"
            :is-read-only="$isReadOnly('SETTINGS')" />
        <HorizontalTabBar
            :items="tabs">
            <template #item>
                <HorizontalTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData"
                    @showModal="onShowModal" />
            </template>
        </HorizontalTabBar>
        <CreateUnitModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @create="onCreatedData" />
    </Page>
</template>

<script>
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'Settings',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        CreateUnitModalForm: () => import('@Core/components/Modals/CreateUnitModalForm'),
    },
    mixins: [gridModalMixin],
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    head() {
        return {
            title: 'Settings - Ergonode',
        };
    },
};
</script>
