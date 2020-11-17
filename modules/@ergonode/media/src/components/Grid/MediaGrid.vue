/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IntersectionObserver @intersect="onIntersect">
        <Grid
            :columns="columnsWithAttachColumn"
            :data-count="filtered"
            :drafts="drafts"
            :filters="filterValues"
            :rows="rowsWithAttachValues"
            :collection-cell-binding="collectionCellBinding"
            :extended-columns="extendedColumns"
            :extended-data-cells="extendedDataCells"
            :extended-data-filter-cells="extendedDataFilterCells"
            :extended-data-edit-cells="extendedDataEditCells"
            :extended-edit-filter-cells="extendedDataEditFilterCells"
            :is-editable="isAllowedToUpdate"
            :is-prefetching-data="isPrefetchingData"
            :is-basic-filter="true"
            :is-header-visible="true"
            :is-collection-layout="true"
            @edit-row="onEditRow"
            @preview-row="onEditRow"
            @cell-value="onCellValueChange"
            @delete-row="onRemoveRow"
            @fetch-data="onFetchData"
            @remove-all-filters="onRemoveAllFilters"
            @filter="onFilterChange">
            <template #appendFooter>
                <Button
                    title="SAVE MEDIA"
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
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Media/config/privileges';
import {
    MEDIA_TYPE,
} from '@Media/defaults';
import {
    GRAPHITE,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import Grid from '@UI/components/Grid/Grid';
import {
    debounce,
} from 'debounce';

export default {
    name: 'MediaGrid',
    components: {
        Grid,
        Button,
        IntersectionObserver,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
    props: {
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
            searchResult: null,
            isSearchFocused: false,
            isPrefetchingData: true,
            filterValues: {},
            rows: [],
            columns: [],
            filtered: 0,
            localParams: DEFAULT_GRID_FETCH_PARAMS,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
        collectionCellBinding() {
            return {
                imageColumn: 'image',
                descriptionColumn: 'name',
                type: 'MEDIA_ATTACH',
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
                    if (i === 3) {
                        columns.push({
                            id: 'esa_attached',
                            type: 'BOOL',
                            label: 'Attached',
                            visible: true,
                            editable: true,
                            deletable: false,
                            parameters: [],
                        });
                    } else {
                        columns.push(this.columns[i]);
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
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.debouncedSearch;
    },
    methods: {
        async onIntersect(isIntersecting) {
            if (isIntersecting) {
                this.isPrefetchingData = true;

                await this.onFetchData(this.localParams);

                this.isPrefetchingData = false;
            }
        },
        onFilterChange(filters) {
            this.filterValues = filters;

            this.onFetchData({
                ...this.localParams,
                filter: this.filterValues,
            });
        },
        onRemoveAllFilters() {
            this.filterValues = {};

            this.onFetchData({
                ...this.localParams,
                filter: {},
            });
        },
        async onFetchData({
            offset,
            limit,
            filter,
            sortedColumn,
        } = DEFAULT_GRID_FETCH_PARAMS) {
            this.localParams = {
                offset,
                limit,
                filter: `type=${this.type}${filter ? `;${filter}` : ''}`,
                sortedColumn,
            };

            const params = {
                offset,
                limit,
                extended: true,
                filter: this.localParams.filters,
            };

            if (Object.keys(sortedColumn).length) {
                const {
                    index: colSortID, orderState,
                } = sortedColumn;

                params.field = colSortID;
                params.order = orderState;
            }

            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
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
            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Grid data haven’t been fetched properly',
            });
        },
        onRemoveRow() {
            this.onFetchData(this.localParams);
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
                    message: 'Resources have been updated',
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: 'No changes have been made',
                });
            }
        },
        onSearchFocus(isFocused) {
            this.isSearchFocused = isFocused;
        },
        onSearch(value) {
            this.searchResult = value;
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'media-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
