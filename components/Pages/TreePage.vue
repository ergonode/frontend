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
                title: 'Visual designer',
                path: '/category-trees/tree',
                active: true,
                isContextualMenu: false,
            },
        ],
    }),
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
        }),
        isBlurVisible() {
            return this.isListElementDragging;
        },
        blurZIndex() {
            if (this.isListElementDragging) {
                return { zIndex: '10' };
            }
            return null;
        },
    },
};
</script>
