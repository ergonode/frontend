/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :scope="scope"
        :columns="columnsWithAttachColumn"
        :data-count="filtered"
        :rows="rowsWithAttachValues"
        :drafts="drafts"
        :pagination="pagination"
        :filters="filterValues"
        :sort-order="localParams.sortOrder"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :layout="layout"
        :is-prefetching-data="isPrefetchingData"
        :is-collection-layout="true"
        :is-editable="true"
        :is-header-visible="true"
        :is-basic-filter="true"
        :is-action-column="false"
        @cell-value="onCellValueChange"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @remove-all-filters="onRemoveAllFilters"
        @filter="onFilterChange"
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
        </template>
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('@Collections.collection.components.ProductsToAttachForCollectionGrid.noProducts')"
                :subtitle="$t('@Collections.collection.components.ProductsToAttachForCollectionGrid.createFirst')" />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <UpdateProductsAttachmentButton
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                :skus="skus"
                @updated="onProductsAttachmentUpdated" />
        </template>
    </Grid>
</template>

<script>
import UpdateProductsAttachmentButton from '@Collections/components/Buttons/UpdateProductsAttachmentButton';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductsToAttachForCollectionGrid',
    components: {
        UpdateProductsAttachmentButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Collections/components/Grids/ProductsToAttachForCollectionGrid/props',
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
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        return {
            layout: GRID_LAYOUT.TABLE,
            columns: [],
            rows: [],
            filtered: 0,
            filterValues: {},
            isPrefetchingData: true,
            skus: {},
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Collections/components/Grids/ProductsToAttachForCollectionGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Collections/components/Grids/ProductsToAttachForCollectionGrid/footer');
        },
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
                type: 'PRODUCT_ATTACH',
                additionalColumns: [
                    'esa_attached',
                ],
            };
        },
        columnsWithAttachColumn() {
            if (!this.columns.length) {
                return [];
            }

            const columns = [];

            for (let i = 0; i < this.columns.length; i += 1) {
                if (this.columns[i].id !== 'type') {
                    columns.push(this.columns[i]);

                    if (i === 4) {
                        columns.push({
                            id: 'esa_attached',
                            type: 'BOOL',
                            label: this.$t('@Collections.collection.components.ProductsToAttachForCollectionGrid.attachedLabel'),
                            visible: true,
                            editable: true,
                            deletable: false,
                            parameters: [],
                        });
                    }
                }
            }

            return columns;
        },
        rowsWithAttachValues() {
            const rows = [
                ...this.rows,
            ];

            for (let i = 0; i < this.rows.length; i += 1) {
                rows[i].esa_attached = {
                    value:
                        Array.isArray(this.value)
                            ? this.value.some(id => id === this.rows[i].id.value)
                            : this.value === this.rows[i].id.value,
                };
            }

            return rows;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onLayoutChange(layout) {
            this.layout = layout;
        },
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;
            this.pagination.page = 1;
            this.localParams.filter = getParsedFilters(filters);
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

            this.onFetchData();
        },
        onRemoveAllFilters() {
            this.filterValues = {};
            this.pagination.page = 1;
            this.localParams.filter = '';
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onColumnSortChange(sortOrder) {
            this.localParams.sortOrder = sortOrder;

            this.onFetchData();
        },
        async onProductsAttachmentUpdated() {
            const skusKeys = Object.keys(this.skus);

            skusKeys.forEach((key) => {
                const rowIndex = this.rows.findIndex(({
                    id,
                }) => id.value === key);

                if (rowIndex !== -1) {
                    this.rows[rowIndex].esa_attached.value = this.skus[key].value;
                }
            });

            this.setDrafts();
            this.skus = {};
        },
        async onFetchData() {
            const {
                sortOrder = {},
                filter,
                ...rest
            } = this.localParams;

            const filters = [
                filter,
            ];

            filters.push(`esa_product_collection${FILTER_OPERATOR.NOT_EQUAL}${this.$route.params.id}`);

            const params = {
                ...rest,
                ...sortOrder,
                filter: filters.join(';'),
                columns: 'esa_sku,esa_template,esa_default_image,esa_default_label',
            };

            await getGridData({
                $axios: this.$axios,
                path: 'products',
                params,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Collections.collection.components.ProductsToAttachForCollectionGrid.getRequest'),
            });

            this.isPrefetchingData = false;
        },
        onFetchGridDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;

            this.isPrefetchingData = false;
        },
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId,
                columnId,
                value,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;

                const row = this.rows.find(({
                    id,
                }) => rowId === id.value);

                this.skus[rowId] = {
                    sku: row.esa_sku.value,
                    value,
                };
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'productsToAttachForCollectionGrid',
                value: this.drafts,
            });
        },
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                query: getParsedFilters(this.localParams.filter),
                ...props,
            };
        },
    },
};
</script>
