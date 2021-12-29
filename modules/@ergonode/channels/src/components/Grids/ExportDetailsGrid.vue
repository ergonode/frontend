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
        :pagination="pagination"
        :filters="filterValues"
        :extended-components="extendedGridComponents"
        :is-prefetching-data="isPrefetchingData"
        :is-header-visible="true"
        :is-basic-filter="true"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters"
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
            <div class="export-details-tiles">
                <Tile
                    v-for="(detail, index) in details"
                    :key="index"
                    :label="detail.label"
                    :value="detail.value" />
            </div>
        </template>
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('@Channels.channel.components.ExportDetailsGrid.placeholderTitle')"
                :subtitle="$t('@Channels.channel.components.ExportDetailsGrid.placeholderSubtitle')" />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <DownloadExportFileButton
                v-if="downloadLink"
                :link="downloadLink"
                :filename="exportFilename" />
        </template>
    </Grid>
</template>

<script>
import DownloadExportFileButton from '@Channels/components/Buttons/DownloadExportFileButton';
import PRIVILEGES from '@Channels/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import Tile from '@UI/components/Tile/Tile';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ExportDetailsGrid',
    components: {
        Tile,
        DownloadExportFileButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Channels/components/Grids/ExportDetailsGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        extendedGridComponentsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
        channelId: {
            type: String,
            required: true,
        },
        exportId: {
            type: String,
            required: true,
        },
    },
    async fetch() {
        await Promise.all([
            this.getExportDetails({
                channelId: this.channelId,
                exportId: this.exportId,
                onSuccess: this.onGetExportDetailsSuccess,
            }),
            this.onFetchData(),
        ]);
    },
    data() {
        return {
            columns: [],
            rows: [],
            filtered: 0,
            filterValues: {},
            isPrefetchingData: true,
            details: [],
            downloadLink: '',
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Channels/components/Grids/ExportDetailsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Channels/components/Grids/ExportDetailsGrid/footer');
        },
        exportFilename() {
            if (this.details.length < 1) {
                return this.$t('@Channels.channel.components.ExportDetailsGrid.defaultExportFilename');
            }

            return this.details[1].value;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
    },
    methods: {
        ...mapActions('channel', [
            'getExportDetails',
        ]),
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

            this.onFetchData();
        },
        onGetExportDetailsSuccess({
            details,
            links,
        }) {
            this.details = details;

            if (links && links.attachment) {
                this.downloadLink = links.attachment.href;
            }

            this.isPrefetchingData = false;
        },
        onRemoveAllFilters() {
            this.filterValues = {};
            this.pagination.page = 1;
            this.localParams.filter = '';
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;
            this.pagination.page = 1;
            this.localParams.filter = getParsedFilters(filters);
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

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

            const params = {
                ...rest,
                ...sortOrder,
            };

            await getGridData({
                $axios: this.$axios,
                path: `channels/${this.channelId}/exports/${this.exportId}/errors`,
                params,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Channels.channel.components.ExportDetailsGrid.errorMessage'),
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

<style lang="scss" scoped>
    .export-details-tiles {
        display: flex;
        flex-wrap: wrap;

        & > * {
            margin-right: 12px;
        }
    }
</style>
