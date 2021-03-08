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
    getCount,
} from '@BatchActions/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    BATCH_ACTION_TYPE,
} from '@ProductBatchActions/defaults';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductsBatchActionsButton',
    components: {
        BatchActionsButton,
        UpdateProductsModal: () => import('@ProductBatchActions/components/Modals/UpdateProductsModal'),
    },
    props: {
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
        onFetchData: {
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
        ...mapState('batchAction', {
            removeProductsBatchActions: state => state.actionsQueue.filter(
                batchAction => batchAction.payload.type === BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
            ),
        }),
        removeBatchActionItem() {
            return {
                label: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.deleteBatchActionLabel'),
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

                            const uuid = getUUID();
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
                                id: uuid,
                                request,
                            });

                            document.documentElement.addEventListener(
                                uuid,
                                this.onRemoveProductsBatchAction,
                            );
                        },
                    });
                },
            };
        },
        editBatchActionItem() {
            return {
                label: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.editBatchActionLabel'),
                action: ({
                    ids,
                    excludedIds,
                    selectedRowsCount,
                    filter,
                    onApply,
                }) => {
                    this.updatingProductsPayload = {
                        ids,
                        excludedIds,
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
    mounted() {
        this.removeProductsBatchActions.forEach(({
            id,
        }) => {
            document.documentElement.addEventListener(
                id,
                this.onRemoveProductsBatchAction,
            );
        });
    },
    beforeDestroy() {
        this.removeProductsBatchActions.forEach(({
            id,
        }) => {
            document.documentElement.removeEventListener(
                id,
                this.onRemoveProductsBatchAction,
            );
        });
    },
    methods: {
        ...mapActions('batchAction', [
            'addBatchAction',
        ]),
        getFilter({
            ids = [], excludedIds = [],
        }) {
            let filter = {};

            if (ids.length || excludedIds.length) {
                filter = {
                    ids: {
                        list: ids.length > 0 ? ids : excludedIds,
                        included: ids.length > 0,
                    },
                };
            } else {
                filter = 'all';
            }

            return filter;
        },
        async onActionSelect(option) {
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

            payload.filter = this.getFilter({
                ids: payload.ids,
                excludedIds: payload.excludedIds,
            });

            const {
                count,
            } = await getCount({
                $axios: this.$axios,
                params: payload.filter,
            });

            payload.selectedRowsCount = count;

            option.action(payload);
        },
        async onRemoveProductsBatchAction(event) {
            if (!event.detail.error) {
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.ProductsBatchActions.successAlert'),
                });

                this.onFetchData();
            }

            document.documentElement.removeEventListener(
                event.detail.id,
                this.onRemoveProductsBatchAction,
            );
        },
        onCloseUpdatingProductsModal() {
            this.updatingProductsPayload = null;
        },
    },
};
</script>
