/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :icon="icon" />
        <HorizontalTabBar
            :items="tabs" />
        <!--
            is-adding-new-tab-enabled
            NOTE: We will add this attribute when we support the functionality of many tabs
        -->
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
    </PageWrapper>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'GridProductPage',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        Blur: () => import('~/components/Blur/Blur'),
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
    data: () => ({
        tabs: [
            {
                title: 'My amazing grid',
                path: '/products/grid',
                active: true,
                isContextualMenu: false,
            },
        ],
    }),
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            isColumnDragging: state => state.isColumnDragging,
            isFilterDragging: state => state.isFilterDragging,
        }),
        isBlurVisible() {
            return this.isListElementDragging
                || this.isColumnDragging
                || this.isFilterDragging;
        },
        blurZIndex() {
            if (this.isListElementDragging) {
                return { zIndex: '10' };
            }

            if (this.isColumnDragging) {
                return { zIndex: '15' };
            }

            if (this.isFilterDragging) {
                return { zIndex: '20' };
            }

            return null;
        },
    },
};
</script>
