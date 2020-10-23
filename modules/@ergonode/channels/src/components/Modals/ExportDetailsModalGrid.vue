/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Export details"
        @close="onClose">
        <template #body>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :filters="filterValues"
                :extended-columns="extendedColumns"
                :extended-data-cells="extendedDataCells"
                :extended-data-filter-cells="extendedDataFilterCells"
                :extended-data-edit-cells="extendedDataEditCells"
                :extended-edit-filter-cells="extendedDataEditFilterCells"
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-basic-filter="true"
                @fetch-data="onFetchData"
                @filter="onFilterChange"
                @remove-all-filters="onRemoveAllFilters">
                <template #actionsHeader>
                    <div class="export-details-tiles">
                        <Tile
                            v-for="(detail, index) in details"
                            :key="index"
                            :label="detail.label"
                            :value="detail.value" />
                    </div>
                </template>
                <template #appendFooter>
                    <Button
                        v-if="downloadLink"
                        title="DOWNLOAD FILE"
                        :size="smallSize"
                        :disabled="!isAllowedToUpdate"
                        @click.native="onDownloadExportFile" />
                </template>
            </Grid>
        </template>
    </ModalGrid>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import Button from '@Core/components/Button/Button';
import Grid from '@Core/components/Grid/Grid';
import ModalGrid from '@Core/components/Modal/ModalGrid';
import Tile from '@Core/components/Tile/Tile';
import {
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ExportDetailsModalGrid',
    components: {
        ModalGrid,
        Tile,
        Button,
        Grid,
    },
    mixins: [
        extendedGridComponentsMixin,
    ],
    props: {
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
        const [
            exportDetailsResponse,
        ] = await Promise.all([
            this.getExportDetails({
                channelId: this.channelId,
                exportId: this.exportId,
            }),
            this.onFetchData(),
        ]);

        const {
            details,
            links,
        } = exportDetailsResponse;

        this.details = details;

        if (links && links.attachment) {
            this.downloadLink = links.attachment.href;
        }

        this.isPrefetchingData = false;
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
        };
    },
    computed: {
        ...mapState('channel', [
            'type',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('channel', [
            'getExportDetails',
        ]),
        onRemoveAllFilters() {
            this.filterValues = {};

            this.onFetchData({
                ...this.localParams,
                filter: {},
            });
        },
        onFilterChange(filters) {
            this.filterValues = filters;

            this.onFetchData({
                ...this.localParams,
                filter: this.filterValues,
            });
        },
        async onFetchData(params = DEFAULT_GRID_FETCH_PARAMS) {
            const {
                columns,
                rows,
                filtered,
            } = await getGridData({
                $axios: this.$axios,
                path: `channels/${this.channelId}/exports/${this.exportId}/errors`,
                params: {
                    ...params,
                    extended: true,
                },
            });

            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;
        },
        async onDownloadExportFile() {
            const response = await this.$axios.$get(this.downloadLink, {
                responseType: 'arraybuffer',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([
                response,
            ]));
            const link = document.createElement('a');

            link.href = downloadUrl;
            link.setAttribute('download', `export_${this.type}_${this.details[1].value}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        onClose() {
            this.$emit('close');
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
