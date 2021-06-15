/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columnsWithAttachColumn"
        :data-count="filtered"
        :drafts="drafts"
        :pagination="pagination"
        :filters="filterValues"
        :sort-order="localParams.sortOrder"
        :rows="rowsWithAttachValues"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-header-visible="true"
        :is-collection-layout="true"
        :is-action-column="false"
        @edit-row="onEditRow"
        @preview-row="onEditRow"
        @cell-value="onCellValueChange"
        @delete-row="onRemoveRow"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @remove-all-filters="onRemoveAllFilters"
        @filter="onFilterChange"
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
                :title="$t('@Products.product._.noProduct')"
                :subtitle="$t('@Products.product._.createFirst')" />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <Button
                :title="$t('@Products._.submit')"
                :size="smallSize"
                @click.native="onSaveRelations" />
        </template>
    </Grid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
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
    ROUTE_NAME,
} from '@Products/config/routes';
import Button from '@UI/components/Button/Button';
import Grid from '@UI/components/Grid/Grid';
import GridNoDataPlaceholder from '@UI/components/Grid/GridNoDataPlaceholder';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import {
    debounce,
} from 'debounce';

export default {
    name: 'AddProductRelationsGrid',
    components: {
        Grid,
        GridNoDataPlaceholder,
        Button,
        IntersectionObserver,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/components/Grids/AddProductRelationsGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
    props: {
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
        },
        attributeId: {
            type: String,
            default: '',
        },
        productId: {
            type: String,
            default: '',
        },
    },
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        return {
            searchValue: null,
            isPrefetchingData: true,
            filterValues: {},
            rows: [],
            columns: [],
            filtered: 0,
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Products/components/Grids/AddProductRelationsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/AddProductRelationsGrid/footer');
        },
        smallSize() {
            return SIZE.SMALL;
        },
        collectionCellBinding() {
            return {
                imageColumn: 'esa_default_image',
                descriptionColumn: 'esa_default_label',
                type: 'PRODUCT_ATTACH',
                additionalColumns: [
                    'attached',
                ],
            };
        },
        columnsWithAttachColumn() {
            if (this.isDirectRelation) {
                return this.columns.map((column) => {
                    if (column.id === 'attached') {
                        return {
                            ...column,
                            filter: {
                                type: 'SELECT',
                                options: {
                                    false: {
                                        label: this.$t('@Products.product.components.AddProductRelationsGrid.notAttachedLabel'),
                                    },
                                    true: {
                                        label: this.$t('@Products.product.components.AddProductRelationsGrid.attachedLabel'),
                                    },
                                },
                            },
                        };
                    }

                    return column;
                });
            }

            const columns = [];

            for (let i = 0; i < this.columns.length; i += 1) {
                columns.push(this.columns[i]);

                if (this.columns[i].id === 'sku') {
                    columns.push({
                        id: 'attached',
                        type: 'BOOL',
                        label: this.$t('@Products.product.components.AddProductRelationsGrid.attachLabel'),
                        visible: true,
                        editable: true,
                        deletable: false,
                        parameters: [],
                    });
                }
            }

            return columns;
        },
        rowsWithAttachValues() {
            const rows = [
                ...this.rows,
            ];

            for (let i = 0; i < this.rows.length; i += 1) {
                rows[i].attached = {
                    value:
                        Array.isArray(this.value)
                            ? this.value.some(id => id === this.rows[i].id.value)
                            : this.value === this.rows[i].id.value,
                };
            }

            return rows;
        },
        isDirectRelation() {
            return this.attributeId !== '' && this.productId !== '';
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    created() {
        this.onDebounceSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.onDebounceSearch;
    },
    methods: {
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
        async onFetchData() {
            const {
                sortOrder = {}, ...rest
            } = this.localParams;

            let path = 'products';
            let columns = 'sku,esa_template,esa_default_label,esa_default_image,_links';

            if (this.isDirectRelation) {
                path = `products/${this.productId}/related/${this.attributeId}`;
                columns = 'sku,attached,template_id,default_label,default_image,_links';
            }

            const params = {
                ...rest,
                ...sortOrder,
                columns,
            };

            await getGridData({
                $route: this.$route,
                $cookies: this.$userCookies,
                $axios: this.$axios,
                path,
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
            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Products.product.components.AddProductRelationsGrid.errorGetMessage'),
            });
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.AddProductRelationsGrid.successRemoveMessage'),
            });
            this.onFetchData();
        },
        onCellValueChange(cellValues) {
            const drafts = {
                ...this.drafts,
            };

            cellValues.forEach(({
                rowId,
                columnId,
                value,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;
            });

            this.setDrafts(drafts);
        },
        onSaveRelations() {
            const value = [];
            const toRemove = [];

            Object.keys(this.drafts).forEach((key) => {
                const [
                    rowId,
                ] = key.split('/');

                if (this.drafts[key]) {
                    value.push(rowId);
                } else {
                    toRemove.push(rowId);
                }

                const row = this.rows.find(({
                    id,
                }) => id.value === rowId);

                if (row) {
                    row.attached.value = this.drafts[key];
                }
            });

            this.setDrafts();

            if (value.length || toRemove.length) {
                const mappedValue = [
                    ...this.value.filter(id => !toRemove.some(removeId => removeId === id)),
                    ...value,
                ];

                this.$emit('input', mappedValue);

                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@Products.product.components.AddProductRelationsGrid.successUpdateMessage'),
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: this.$t('@Products.product.components.AddProductRelationsGrid.infoMessage'),
                });
            }
        },
        onSearch(value) {
            this.searchValue = value;
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                params: {
                    id: args[lastIndex],
                },
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
