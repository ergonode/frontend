/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :is-editable="isAllowedToUpdate"
        :columns="columnsWithAttachColumn"
        :data-count="filtered"
        :drafts="drafts"
        :rows="rowsWithAttachValues"
        :collection-cell-binding="collectionCellBinding"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-header-visible="true"
        :is-collection-layout="true"
        @editRow="onEditRow"
        @previewRow="onEditRow"
        @cellValue="onCellValueChange"
        @deleteRow="onRemoveRow"
        @fetchData="onFetchData">
        <!--  TODO: Uncomment when we have global search      -->
        <!--        <template #headerActions>-->
        <!--            <TextField-->
        <!--                :value="searchResult"-->
        <!--                :size="smallSize"-->
        <!--                placeholder="Search..."-->
        <!--                @input="debouncedSearch"-->
        <!--                @focus="onSearchFocus">-->
        <!--                <template #append>-->
        <!--                    <IconSearch :fill-color="searchIconFillColor" />-->
        <!--                </template>-->
        <!--            </TextField>-->
        <!--        </template>-->
        <template #appendFooter>
            <Button
                title="SAVE MEDIA"
                :size="smallSize"
                @click.native="onSaveMedia" />
        </template>
    </Grid>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import Grid from '@Core/components/Grid/Grid';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DATA_LIMIT,
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
// TODO: Uncomment when we have global search
// import IconSearch from '@Core/components/Icons/Actions/IconSearch';
// import TextField from '@Core/components/Inputs/TextField';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Media/config/privileges';
import {
    MEDIA_TYPE,
} from '@Media/defaults';
import {
    debounce,
} from 'debounce';

export default {
    name: 'MediaGrid',
    components: {
        Grid,
        Button,
        // TODO: Uncomment when we have global search
        // TextField,
        // IconSearch,
    },
    mixins: [
        gridDraftMixin,
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
            observer: null,
            isPrefetchingData: true,
            rows: [],
            columns: [],
            filtered: 0,
            localParams: {
                offset: 0,
                limit: DATA_LIMIT,
                filters: '',
                sortedColumn: {},
            },
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

            return [
                ...this.columns.filter(column => column.id !== 'type'),
                {
                    id: 'esa_attached',
                    type: 'MEDIA_ATTACH',
                    label: 'Attached',
                    visible: true,
                    editable: true,
                    deletable: false,
                    parameters: [],
                },
            ];
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
    mounted() {
        this.observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                this.isPrefetchingData = true;

                await this.onFetchData(this.localParams);

                this.isPrefetchingData = false;
            }
        });

        this.observer.observe(this.$el);
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.debouncedSearch;
        this.observer.disconnect();
    },
    methods: {
        onFetchData({
            offset,
            limit,
            filters,
            sortedColumn,
        } = DEFAULT_GRID_FETCH_PARAMS) {
            this.localParams = {
                offset,
                limit,
                filters: `type=${this.type}${filters ? `;${filters}` : ''}`,
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

            return getGridData({
                $axios: this.$axios,
                path: 'multimedia',
                params,
            }).then(({
                columns,
                rows,
                filtered,
            }) => {
                this.columns = columns;
                this.rows = rows;
                this.filtered = filtered;
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
