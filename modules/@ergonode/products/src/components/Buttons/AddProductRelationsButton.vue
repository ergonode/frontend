/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Products.product.components.AddProductRelationsButton.title')"
        :size="smallSize"
        @click.native="onAddRelations">
        <template #prepend="{ color }">
            <IconSpinner
                v-if="isSubmitting"
                :fill-color="color" />
            <IconSync
                v-else-if="hasValueToSave"
                :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    postGridData,
} from '@Core/services/grid/postGridData.service';

export default {
    name: 'AddProductRelationsButton',
    props: {
        dataCount: {
            type: Number,
            default: 0,
        },
        value: {
            type: Array,
            default: () => [],
        },
        filters: {
            type: Array,
            default: () => [],
        },
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
        excludedFromSelectionRows: {
            type: Object,
            default: () => ({}),
        },
        selectedRowsCount: {
            type: Number,
            default: 0,
        },
        isSelectedAll: {
            type: Boolean,
            default: false,
        },
        onClearSelectedRows: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        selectedRowsIds() {
            return Object.keys(this.selectedRows)
                .filter(key => this.selectedRows[key]);
        },
        excludedFromSelectionRowsIds() {
            return Object.keys(this.excludedFromSelectionRows)
                .filter(key => this.excludedFromSelectionRows[key]);
        },
        hasValueToSave() {
            return this.selectedRowsIds.length > 0
                || this.excludedFromSelectionRowsIds.length > 0
                || this.isSelectedAll;
        },
    },
    methods: {
        async onAddRelations() {
            const selectedAllCount = this.isSelectedAll
                ? this.dataCount - this.excludedFromSelectionRowsIds.length
                : this.selectedRowsIds.length;

            if (selectedAllCount + this.value.length > 100) {
                this.$confirm({
                    type: MODAL_TYPE.DESTRUCTIVE,
                    title: this.$t('@Products.product.components.AddProductRelationsButton.confirmErrorTitle', {
                        info: selectedAllCount + this.value.length,
                    }),
                    subtitle: this.$t('@Products.product.components.AddProductRelationsButton.confirmErrorSubtitle'),
                    applyTitle: this.$t('@Products.product.components.AddProductRelationsButton.confirmErrorApplyTitle'),
                    action: this.onClearSelectedRows,
                });
            } else if (selectedAllCount === 0) {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: this.$t('@Products.product.components.AddProductRelationsButton.infoMessage'),
                });
            } else if (this.selectedRowsIds.length) {
                this.$emit('add', this.selectedRowsIds);
            } else {
                this.isSubmitting = true;

                await postGridData({
                    $axios: this.$axios,
                    path: 'products/grid',
                    data: {
                        limit: selectedAllCount,
                        offset: 0,
                        extended: false,
                        filters: this.filters,
                        view: 'list',
                    },
                    onSuccess: this.onFetchDataSuccess,
                    onError: this.onFetchDataError,
                });
            }
        },
        onFetchDataSuccess({
            rows,
        }) {
            this.$emit(
                'add',
                rows
                    .filter(row => !this.excludedFromSelectionRowsIds
                        .some(excludedRowId => excludedRowId === row.id))
                    .map(row => row.id),
            );

            this.isSubmitting = false;

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.AddProductRelationsButton.successMessage'),
            });
        },
        onFetchDataError() {
            this.isSubmitting = false;

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.AddProductRelationsButton.errorMessage'),
            });
        },
    },
};
</script>
