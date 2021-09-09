/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                :scope="scope"
                :errors="errors"
                :change-values="changeValues" />
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    DEFAULT_PAGE,
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
            filters: getMappedFilters(this.$route.query.advancedFilter),
            verticalTabs: [],
        };
    },
    watch: {
        $route(from, to) {
            if (from.name !== to.name) {
                return;
            }

            this.filters = getMappedFilters(this.$route.query.advancedFilter);

            this.setVerticalTabs();
        },
    },
    mounted() {
        this.setVerticalTabs();
    },
    methods: {
        async setVerticalTabs() {
            const extendedVerticalTabs = await this.$getExtendMethod('@Products/components/Tabs/ProductCatalogTab/verticalTabs', {
                $this: this,
            });

            this.verticalTabs = [].concat(...extendedVerticalTabs);
        },
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
