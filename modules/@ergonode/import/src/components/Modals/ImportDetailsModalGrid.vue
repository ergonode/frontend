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
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-basic-filter="true"
                @fetch-data="onFetchData">
                <template #headerActions>
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
import Grid from '@Core/components/Grid/Grid';
import ModalGrid from '@Core/components/Modal/ModalGrid';
import Tile from '@Core/components/Tile/Tile';
import {
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
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
        const [
            importDetails,
        ] = await Promise.all([
            this.getImportDetails({
                sourceId: this.sourceId,
                importId: this.importId,
            }),
            this.onFetchData(),
        ]);

        this.details = importDetails;

        this.isPrefetchingData = false;
    },
    data() {
        return {
            details: [],
            columns: [],
            rows: [],
            filtered: 0,
            isPrefetchingData: true,
        };
    },
    methods: {
        ...mapActions('import', [
            'getImportDetails',
        ]),
        async onFetchData(params = DEFAULT_GRID_FETCH_PARAMS) {
            const {
                columns,
                rows,
                filtered,
            } = await getGridData({
                $axios: this.$axios,
                path: `sources/${this.sourceId}/imports/${this.importId}/errors`,
                params: {
                    ...params,
                    extended: true,
                },
            });

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
