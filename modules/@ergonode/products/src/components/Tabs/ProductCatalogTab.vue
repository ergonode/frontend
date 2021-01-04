/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <RemoveFilterAndColumnDropZone />
            </VerticalTabBar>
        </template>
        <template #grid>
            <ProductsGrid
                :scope="scope"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import ProductsGrid from '@Products/components/Grids/ProductsGrid';
import RemoveFilterAndColumnDropZone from '@UI/components/Grid/DropZone/RemoveFilterAndColumnDropZone';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';

export default {
    name: 'ProductCatalogTab',
    components: {
        ProductsGrid,
        GridViewTemplate,
        RemoveFilterAndColumnDropZone,
        VerticalTabBar,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            extendVerticalTabs: [],
        };
    },
    computed: {
        verticalTabs() {
            return [
                {
                    title: 'Product attributes',
                    component: () => import('@Attributes/components/VerticalTabs/AttributesVerticalTab'),
                    icon: () => import('@Attributes/components/Icons/IconAttributes'),
                    props: {},
                },
                {
                    title: 'System attributes',
                    component: () => import('@Attributes/components/VerticalTabs/SystemAttributesVerticalTab'),
                    icon: () => import('@Core/components/Icons/Menu/IconSettings'),
                    props: {},
                },
                ...this.extendVerticalTabs,
            ];
        },
    },
    async mounted() {
        const extendVerticalTabs = await this.$getExtendMethod('@Products/components/Tabs/ProductCatalogTab/verticalTabs', {
            $this: this,
        });

        this.extendVerticalTabs = [
            ...this.extendVerticalTabs,
            ...extendVerticalTabs,
        ];
    },
};
</script>
