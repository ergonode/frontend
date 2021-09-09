/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BatchActionsButton
        :highlighted="isAnyRowSelected"
        :options="actionsOptions"
        :selected-rows-count="selectedRowsCount"
        @action="onActionSelect">
        <UpdateProductsModal
            v-if="updatingProductsPayload"
            v-bind="{ ...updatingProductsPayload }"
            @close="onCloseUpdatingProductsModal" />
    </BatchActionsButton>
</template>

<script>
import BatchActionsButton from '@BatchActions/components/Buttons/BatchActionsButton';
import {
    getFilter,
} from '@BatchActions/models/batchActionMapper';
import {
    create,
    getCount,
} from '@BatchActions/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    BATCH_ACTION_TYPE,
} from '@ProductBatchActions/defaults';
import PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'ProductsBatchActionsButton',
    components: {
        BatchActionsButton,
        UpdateProductsModal: () => import('@ProductBatchActions/components/Modals/UpdateProductsModal'),
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
        onClearSelectedRows: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            updatingProductsPayload: null,
        };
    },
    computed: {
        removeBatchActionItem() {
            return {
                label: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.deleteBatchActionLabel'),
                type: BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
                action: ({
                    selectedRowsCount,
                    filter,
                    onApply,
                }) => {
                    this.$confirm({
                        type: MODAL_TYPE.DESTRUCTIVE,
                        title: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.confirmTitle', {
                            info: selectedRowsCount,
                        }),
                        subtitle: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.confirmSubtitle'),
                        applyTitle: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.confirmApplyTitle', {
                            info: selectedRowsCount,
                        }),
                        action: () => {
                            onApply();

                            const request = {
                                type: '$post',
                                href: 'batch-action',
                                payload: {
                                    type: BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
                                },
                            };

                            if (filter) {
                                request.payload.filter = filter;
                            }

                            this.addBatchAction({
                                request,
                            });
                        },
                    });
                },
            };
        },
        editBatchActionItem() {
            return {
                label: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.editBatchActionLabel'),
                type: BATCH_ACTION_TYPE.UPDATE_PRODUCTS,
                action: ({
                    selectedRowsCount,
                    filter,
                    onApply,
                }) => {
                    this.updatingProductsPayload = {
                        selectedRowsCount,
                        filter,
                        onApply,
                    };
                },
            };
        },
        actionsOptions() {
            const actionsOptions = [];

            if (this.$hasAccess([
                PRIVILEGES.PRODUCT.delete,
            ])) {
                actionsOptions.push(this.removeBatchActionItem);
            }

            if (this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ])) {
                actionsOptions.push(this.editBatchActionItem);
            }

            return actionsOptions;
        },
        isAnyRowSelected() {
            return this.selectedRowsCount > 0;
        },
    },
    methods: {
        addBatchAction({
            request,
        }) {
            try {
                create({
                    $axios: this.$axios,
                    ...request,
                });

                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.successAlert'),
                });
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.errorAlert'),
                });
            }
        },
        async onActionSelect(option) {
            try {
                const payload = {
                    ids: [],
                    excludedIds: [],
                    selectedRowsCount: 0,
                    filter: null,
                    onApply: this.onClearSelectedRows,
                };

                Object.keys(this.selectedRows).forEach((key) => {
                    if (this.selectedRows[key]) {
                        payload.ids.push(key);
                    }
                });

                Object.keys(this.excludedFromSelectionRows).forEach((key) => {
                    if (this.excludedFromSelectionRows[key]) {
                        payload.excludedIds.push(key);
                    }
                });

                payload.filter = getFilter({
                    ids: payload.ids,
                    excludedIds: payload.excludedIds,
                    query: this.query,
                });

                const {
                    count,
                } = await getCount({
                    $axios: this.$axios,
                    payload: {
                        filter: payload.filter,
                        type: option.type,
                    },
                });
                payload.selectedRowsCount = count;

                option.action(payload);
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.countError'),
                });
            }
        },
        onCloseUpdatingProductsModal() {
            this.updatingProductsPayload = null;
        },
    },
};
</script>
