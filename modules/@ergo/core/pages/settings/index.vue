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
            @create="onCreatedData" />
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
    </Page>
</template>

<script>
import { Z_INDEX_LVL_0 } from '@Core/assets/scss/_js-variables/indexes.scss';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import { mapState } from 'vuex';

export default {
    name: 'Settings',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalRoutingTabBar: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBar'),
        Blur: () => import('@Core/components/Blur/Blur'),
    },
    mixins: [gridModalMixin],
    data() {
        return {
            modalType: null,
        };
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            draggedElementOnGrid: state => state.draggedElementOnGrid,
        }),
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        getModalComponentViaType() {
            switch (this.modalType) {
            case 'units':
                return () => import('@Core/components/Modals/CreateUnitModalForm');
            default:
                return null;
            }
        },
        isBlurVisible() {
            return this.isListElementDragging || this.draggedElementOnGrid;
        },
        blurZIndex() {
            if (this.isBlurVisible) {
                return { zIndex: Z_INDEX_LVL_0 };
            }
            return null;
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
