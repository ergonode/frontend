/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IntersectionObserver @intersect="onIntersect">
        <Grid
            :scope="scope"
            :columns="columnsWithAttachColumn"
            :data-count="filtered"
            :drafts="drafts"
            :pagination="pagination"
            :filters="filterValues"
            :rows="rowsWithAttachValues"
            :sort-order="localParams.sortOrder"
            :collection-cell-binding="collectionCellBinding"
            :layout="layout"
            :extended-components="extendedGridComponents"
            :is-editable="isAllowedToUpdate"
            :is-prefetching-data="isPrefetchingData"
            :is-basic-filter="true"
            :is-header-visible="true"
            :is-collection-layout="true"
            @edit-row="onEditRow"
            @preview-row="onEditRow"
            @cell-value="onCellValueChange"
            @delete-row="onRemoveRow"
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
                    :title="$t('@Media.media._.noMedia')"
                    :subtitle="$t('@Media.media._.createFirst')" />
            </template>
            <template #appendFooter>
                <Component
                    v-for="(footerItem, index) in extendedFooter"
                    :is="footerItem.component"
                    :key="index"
                    v-bind="bindingProps(footerItem)" />
                <Button
                    :title="$t('@Media._.submit')"
                    :size="smallSize"
                    @click.native="onSaveMedia" />
            </template>
        </Grid>
    </IntersectionObserver>
</template>

<script>
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
import PRIVILEGES from '@Media/config/privileges';
import {
    ROUTE_NAME,
} from '@Media/config/routes';
import {
    MEDIA_TYPE,
} from '@Media/defaults';
import {
    debounce,
} from 'debounce';

export default {
    name: 'AddMediaGrid',
    mixins: [
        extendPropsMixin({
            extendedKey: '@Media/components/Grids/AddMediaGrid/props',
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
        multiple: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: MEDIA_TYPE.IMAGE,
        },
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
        },
    },
    data() {
        return {
            searchValue: null,
            isPrefetchingData: true,
            filterValues: {},
            layout: GRID_LAYOUT.TABLE,
            rows: [],
            columns: [],
            filtered: 0,
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Media/components/Grids/AddMediaGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Media/components/Grids/AddMediaGrid/footer');
        },
        smallSize() {
            return SIZE.SMALL;
        },
        collectionCellBinding() {
            return {
                imageColumn: 'image',
                descriptionColumn: 'name',
                type: 'MEDIA_ATTACH',
                additionalColumns: [
                    'type',
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

                    if (i === 3) {
                        columns.push({
                            id: 'esa_attached',
                            type: 'BOOL',
                            label: this.$t('@Media.media.components.AddMediaGrid.attachLabel'),
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
                PRIVILEGES.MULTIMEDIA.update,
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
        onLayoutChange(layout) {
            this.layout = layout;
        },
        async onIntersect(isIntersecting) {
            if (isIntersecting) {
                this.isPrefetchingData = true;

                await this.onFetchData();

                this.isPrefetchingData = false;
            }
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
        async onFetchData() {
            const {
                sortOrder = {},
                filter,
                ...rest
            } = this.localParams;

            const filters = [
                filter,
            ];

            if (this.type !== MEDIA_TYPE.APPLICATION) {
                filters.push(`type${FILTER_OPERATOR.EQUAL}${this.type}`);
            }

            const params = {
                ...rest,
                ...sortOrder,
                filter: filters.join(';'),
            };

            await getGridData({
                $axios: this.$axios,
                path: 'multimedia',
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
            this.columns = columns.map((column) => {
                if (column.id === 'image') {
                    return {
                        ...column,
                        type: 'IMAGE_PREVIEW',
                    };
                }

                return column;
            });
            this.rows = rows;
            this.filtered = filtered;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Media.media.components.AddMediaGrid.errorGetMessage'),
            });
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Media.media.components.AddMediaGrid.successRemoveMessage'),
            });
            this.onFetchData();
        },
        onCellValueChange(cellValues) {
            const drafts = this.multiple
                ? {
                    ...this.drafts,
                }
                : {};

            cellValues.forEach(({
                rowId,
                columnId,
                value,
            }) => {
                if (!this.multiple && this.value) {
                    drafts[`${this.value}/${columnId}`] = false;
                }

                drafts[`${rowId}/${columnId}`] = value;
            });

            this.setDrafts(drafts);
        },
        onSaveMedia() {
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
                    row.esa_attached.value = this.drafts[key];
                }
            });

            this.setDrafts();

            if (value.length || toRemove.length) {
                if (this.multiple) {
                    const mappedValue = [
                        ...this.value.filter(id => !toRemove.some(removeId => removeId === id)),
                        ...value,
                    ];

                    this.$emit('input', mappedValue);
                } else if (value.length) {
                    this.$emit('input', value.join(''));
                }

                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@Media.media.components.AddMediaGrid.successUpdateMessage'),
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: this.$t('@Media.media.components.AddMediaGrid.infoMessage'),
                });
            }
        },
        onSearch(value) {
            this.searchValue = value;
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: ROUTE_NAME.MEDIA_RESOURCE_EDIT_GENERAL,
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
