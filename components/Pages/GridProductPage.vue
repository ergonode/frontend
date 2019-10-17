/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :icon="icon"
            :is-read-only="$isReadOnly('PRODUCT')" />
        <HorizontalTabBar
            :items="tabs" />
        <!--
            is-adding-new-tab-enabled
            NOTE: We will add this attribute when we support the functionality of many tabs
        -->
        <!-- <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" /> -->
        <TrashCan v-show="draggedElementOnGrid" />
    </PageWrapper>
</template>

<script>
import { mapState } from 'vuex';
import { DRAGGED_ELEMENT } from '~/defaults/grid/main';

export default {
    name: 'GridProductPage',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        // Blur: () => import('~/components/Blur/Blur'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            required: true,
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
    },
    beforeCreate() {
        this.tabs = [
            {
                title: 'Products',
                route: { name: 'products-grid' },
                active: true,
                isContextualMenu: false,
            },
        ];
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        isBlurVisible() {
            return this.isListElementDragging || this.draggedElementOnGrid;
        },
        blurZIndex() {
            if (this.isListElementDragging) {
                return { zIndex: '10' };
            }

            if (this.draggedElementOnGrid === DRAGGED_ELEMENT.FILTER) {
                return { zIndex: '15' };
            }

            if (this.draggedElementOnGrid === DRAGGED_ELEMENT.COLUMN) {
                return { zIndex: '20' };
            }

            return null;
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
