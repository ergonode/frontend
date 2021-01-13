/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Import details"
        @close="onClose">
        <template #body>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :pagination="pagination"
                :filters="filterValues"
                :extended-components="extendedGridComponents"
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-basic-filter="true"
                @pagination="onPaginationChange"
                @sort-column="onColumnSortChange"
                @filter="onFilterChange"
                @remove-all-filters="onRemoveAllFilters">
                <template #actionsHeader>
                    <div class="import-details-tiles">
                        <Tile
                            v-for="(detail, index) in details"
                            :key="index"
                            :label="detail.label"
                            :value="detail.value" />
                    </div>
                </template>
            </Grid>
        </template>
    </ModalGrid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import Grid from '@UI/components/Grid/Grid';
import ModalGrid from '@UI/components/Modal/ModalGrid';
import Tile from '@UI/components/Tile/Tile';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ImportDetailsModalGrid',
    components: {
        ModalGrid,
        Tile,
        Grid,
    },
    mixins: [
        extendedGridComponentsMixin,
    ],
    props: {
        sourceId: {
            type: String,
            required: true,
        },
        importId: {
            type: String,
            required: true,
        },
    },
    async fetch() {
        await Promise.all([
            this.getImportDetails({
                sourceId: this.sourceId,
                importId: this.importId,
                onSuccess: (({
                    details,
                }) => {
                    this.details = details;
                }),
            }),
            this.onFetchData(),
        ]);

        this.isPrefetchingData = false;
    },
    data() {
        return {
            details: [],
            columns: [],
            rows: [],
            filterValues: {},
            filtered: 0,
            isPrefetchingData: true,
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    methods: {
        ...mapActions('import', [
            'getImportDetails',
        ]),
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

            // TODO:!!!
        },
        onColumnSortChange(sortOrder) {
            this.localParams.sortOrder = sortOrder;

            this.onFetchData();
        },
        async onFetchData() {
            const {
                sortOrder = {}, ...rest
            } = this.localParams;

            const params = {
                ...rest,
                ...sortOrder,
            };

            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `sources/${this.sourceId}/imports/${this.importId}/errors`,
                params,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Grid data haven’t been fetched properly',
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
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .import-details-tiles {
        display: flex;
        flex-wrap: wrap;

        & > * {
            margin-right: 12px;
        }
    }
</style>
