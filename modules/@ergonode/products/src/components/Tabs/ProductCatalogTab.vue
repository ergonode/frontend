/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
                :errors="errors"
                :change-values="changeValues" />
        </template>
    </GridViewTemplate>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
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
            verticalTabs: [],
        };
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Products/components/Tabs/ProductCatalogTab/verticalTabs', {
            $this: this,
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
};
</script>
