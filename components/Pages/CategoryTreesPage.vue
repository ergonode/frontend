/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :breadcrumbs="breadcrumbs"
            icon="sprite-menu menu-tree--selected" />
        <HorizontalTabBar :items="tabs" />
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
    </PageWrapper>
</template>

<script>

import { mapState } from 'vuex';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'CategoryTreesPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        Blur: () => import('~/components/Blur/Blur'),
    },
    data() {
        return {
            breadcrumbs: [],
            buttons: [],
            tabs: [
                {
                    title: 'Tree design',
                    path: '/category-trees/tree',
                    active: true,
                    props: {
                        updateButton: {
                            title: 'SAVE CHANGES',
                            action: this.onSave,
                        },
                    },
                },
            ],
        };
    },
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
