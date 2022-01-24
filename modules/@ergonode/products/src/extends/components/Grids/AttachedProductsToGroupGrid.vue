/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :scope="scope"
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :drafts="drafts"
        :sort-order="sortOrder"
        :filters="filterValues"
        :collection-cell-binding="collectionCellBinding"
        :pagination="pagination"
        :extended-components="extendedGridComponents"
        :layout="layout"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-collection-layout="true"
        :is-header-visible="true"
        :is-border="true"
        @pagination="onPaginationChange"
        @delete-row="onRemoveRow"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters"
        @layout="onLayoutChange"
        v-bind="extendedProps['grid']">
        <template #actionsHeader="actionsHeaderProps">
            <Component
                v-for="(headerItem, index) in extendedActionHeader"
                :is="headerItem.component"
                :key="index"
                v-bind="bindingProps({
                    props: {
                        ...actionsHeaderProps,
                        ...headerItem.props,
                    },
                })" />
            <AddProductsToGroupActionButton />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
        </template>
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('@Products.productExtend.components.AttachedProductsToGroupGrid.noProductsInGroup')"
                :subtitle="$t('@Products.productExtend.components.AttachedProductsToGroupGrid.addProductToGroup')">
                <template #action>
                    <AddProductsToGroupButton />
                </template>
            </GridNoDataPlaceholder>
        </template>
    </Grid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_PAGE,
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getDefaultDataFromQueryParams,
    getFilterQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import AddProductsToGroupActionButton from '@Products/extends/components/Buttons/AddProductsToGroupActionButton';
import AddProductsToGroupButton from '@Products/extends/components/Buttons/AddProductsToGroupButton';
import {
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Products/extends/defaults';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttachedProductsToGroupGrid',
    components: {
        AddProductsToGroupButton,
        AddProductsToGroupActionButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/extends/components/Grids/AttachedProductsToGroupGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
    },
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        const {
            filterValues,
            pagination,
            sortOrder,
        } = getDefaultDataFromQueryParams(this.$route);

        return {
            filterValues,
            pagination,
            sortOrder,
            layout: GRID_LAYOUT.TABLE,
            rows: [],
            columns: [],
            filtered: 0,
            isPrefetchingData: true,
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Products/components/Grids/AttachedProductsToGroupGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/AttachedProductsToGroupGrid/footer');
        },
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    watch: {
        async $route(to, from) {
            if (from.name !== to.name || from.query.layout !== to.query.layout) {
                return;
            }

            const {
                filterValues,
                pagination,
                sortOrder,
            } = getDefaultDataFromQueryParams(this.$route);

            this.filterValues = filterValues;
            this.pagination = pagination;
            this.sortOrder = sortOrder;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
    },
    mounted() {
        document.documentElement.addEventListener(
            PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
            this.onProductsAttachmentUpdated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
            this.onProductsAttachmentUpdated,
        );
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onLayoutChange(layout) {
            this.layout = layout;
        },
        async onProductsAttachmentUpdated() {
            await this.onFetchData();
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.productExtend.components.AttachedProductsToGroupGrid.successMessage'),
            });
            this.onFetchData();
        },
        async onFetchData() {
            const params = getParams({
                $route: this.$route,
                $cookies: this.$gridCookies,
                layout: this.layout,
            });

            if (typeof params.filter === 'undefined') {
                params.filter = '';
            }

            if (!params.filter.includes('attached')) {
                params.filter += `;attached${FILTER_OPERATOR.EQUAL}true`;
            }

            await getGridData({
                $cookies: this.$gridCookies,
                $axios: this.$axios,
                layout: this.layout,
                path: `products/${this.$route.params.id}/children-and-available-products`,
                params,
                onSuccess: this.onFetchDataSuccess,
                onError: this.onFetchDataError,
            });
        },
        onFetchDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns
                .filter(column => column.id !== 'attached')
                .map(column => ({
                    ...column,
                    editable: false,
                }));
            this.rows = rows;
            this.filtered = filtered;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Products.productExtend.components.AttachedProductsToGroupGrid.errorMessage'),
            });
        },
        onRemoveAllFilters() {
            const query = {
                ...this.$route.query,
                page: DEFAULT_PAGE,
            };

            delete query.filter;

            this.$router.replace({
                query,
            });

            this.isPrefetchingData = true;
        },
        onFilterChange(filters) {
            const query = {
                ...this.$route.query,
                page: DEFAULT_PAGE,
                filter: getParsedFilters(filters),
            };

            if (query.filter === '' || query.filter === null) {
                delete query.filter;
            }

            this.$router.replace({
                query,
            });
        },
        onColumnSortChange(sortOrder) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ...sortOrder,
                },
            });
        },
        onPaginationChange(pagination) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ...pagination,
                },
            });
        },
        bindingProps({
            props = {},
        }) {
            const query = getFilterQueryParams(this.$route.query);

            return {
                disabled: !this.isAllowedToUpdate,
                query: query.replace(/\[|\]/g, ''),
                ...props,
            };
        },
    },
};
</script>
