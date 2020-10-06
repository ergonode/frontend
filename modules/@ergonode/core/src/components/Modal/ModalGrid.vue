/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div class="modal-grid">
            <ModalHeader
                :title="title"
                @close="onClose">
                <template #prepend>
                    <slot name="prependHeader" />
                </template>
            </ModalHeader>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :is-prefetching-data="isPrefetchingData"
                :is-select-column="isSelectColumn"
                :is-header-visible="true"
                :is-basic-filter="true"
                @fetch-data="onFetchData">
                <template #headerActions>
                    <slot name="headerActions" />
                </template>
                <template #appendFooter>
                    <slot name="appendFooter" />
                </template>
            </Grid>
        </div>
    </ModalOverlay>
</template>

<script>
import Grid from '@Core/components/Grid/Grid';
import ModalHeader from '@Core/components/Modal/ModalHeader';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';

export default {
    name: 'ModalGrid',
    components: {
        ModalOverlay,
        ModalHeader,
        Grid,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        apiPath: {
            type: String,
            required: true,
        },
        columnParams: {
            type: String,
            default: '',
        },
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
    },
    async fetch() {
        await this.onFetchData();
        this.isPrefetchingData = false;
    },
    data() {
        return {
            columns: [],
            rows: [],
            count: 0,
            filtered: 0,
            isPrefetchingData: true,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        async onFetchData(params = {
            offset: 0,
            limit: DATA_LIMIT,
            filters: '',
            sortedColumn: {},
        }) {
            const {
                columns,
                rows,
                count,
                filtered,
            } = await getGridData({
                $axios: this.$axios,
                path: this.apiPath,
                params: {
                    ...params,
                    extended: true,
                    columns: this.columnParams,
                },
            });

            this.columns = columns;
            this.rows = rows;
            this.count = count;
            this.filtered = filtered;
        },
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal-grid {
        display: flex;
        flex-direction: column;
        width: 960px;
        height: 80%;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;

        &__header {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_20_24;
        }
    }
</style>
