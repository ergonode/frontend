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
    getFilter,
} from '@BatchActions/models/batchActionMapper';
import {
    getCount,
} from '@BatchActions/services';
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
    BATCH_ACTION_TYPE,
} from '@ProductBatchActions/defaults';
import Button from '@UI/components/Button/Button';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import IconSync from '@UI/components/Icons/Feedback/IconSync';

export default {
    name: 'AddProductRelationsButton',
    components: {
        Button,
        IconSpinner,
        IconSync,
    },
    props: {
        query: {
            type: String,
            default: '',
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
            this.isSubmitting = true;

            // TODO think about relation with Batch actions

            const {
                count,
            } = await getCount({
                $axios: this.$axios,
                payload: {
                    filter: getFilter({
                        ids: this.selectedRowsIds,
                        excludedIds: this.excludedFromSelectionRowsIds,
                        query: this.query,
                    }),
                    type: BATCH_ACTION_TYPE.UPDATE_PRODUCTS,
                },
            });

            this.isSubmitting = false;

            if (count > 100) {
                this.$confirm({
                    type: MODAL_TYPE.DESTRUCTIVE,
                    title: this.$t('@Products.product.components.AddProductRelationsButton.confirmErrorTitle', {
                        info: count,
                    }),
                    subtitle: this.$t('@Products.product.components.AddProductRelationsButton.confirmErrorSubtitle'),
                    applyTitle: this.$t('@Products.product.components.AddProductRelationsButton.confirmErrorApplyTitle'),
                    action: this.onClearSelectedRows,
                });
            } else if (count === 0) {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: this.$t('@Products.product.components.AddProductRelationsButton.infoMessage'),
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@Products.product.components.AddProductRelationsButton.successMessage'),
                });
            }
        },
    },
};
</script>
