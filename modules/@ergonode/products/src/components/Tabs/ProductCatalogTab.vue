/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <RemoveFilterAndColumnDropZone :scope="scope" />
            </VerticalTabBar>
        </template>
        <template #grid>
            <ProductsGrid
                :layout="layout"
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                @layout="onLayoutChange" />
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    DEFAULT_PAGE,
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import {
    getMappedFilters,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import ProductsGrid from '@Products/components/Grids/ProductsGrid';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';

export default {
    name: 'ProductCatalogTab',
    components: {
        ProductsGrid,
        GridViewTemplate,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            layout: GRID_LAYOUT.TABLE,
            filters: getMappedFilters(this.$route.query.advancedFilter),
            verticalTabs: [],
        };
    },
    watch: {
        $route(to, from) {
            if (from.name !== to.name || from.query.layout !== to.query.layout) {
                return;
            }

            this.filters = getMappedFilters(this.$route.query.advancedFilter);

            this.setVerticalTabs();
        },
        layout() {
            this.setVerticalTabs();
        },
    },
    mounted() {
        if (this.$route.query.layout) {
            this.layout = this.$route.query.layout;
        }

        this.setVerticalTabs();
    },
    methods: {
        onLayoutChange(layout) {
            this.layout = layout;
        },
        async setVerticalTabs() {
            const extendedVerticalTabs = await this.$getExtendMethod('@Products/components/Tabs/ProductCatalogTab/verticalTabs', {
                $this: this,
            });

            this.verticalTabs = []
                .concat(...extendedVerticalTabs)
                .filter(tab => typeof tab.layouts === 'undefined' || tab.layouts.some(layout => layout === this.layout));
        },
        // INFO: method is used in extensions - do not delete
        onFiltersChange(filters) {
            this.filters = filters;

            this.$router.replace({
                query: {
                    ...this.$route.query,
                    advancedFilter: getParsedFilters({
                        ...getMappedFilters(this.$route.query.advancedFilter),
                        ...this.filters,
                    }),
                    page: DEFAULT_PAGE,
                },
            });
        },
    },
};
</script>
