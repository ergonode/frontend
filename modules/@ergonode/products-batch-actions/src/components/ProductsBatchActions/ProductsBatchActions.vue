/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div class="products-batch-actions">
        <UpdateProductsModal
            v-if="updatingProductsPayload"
            v-bind="{ ...updatingProductsPayload }"
            @close="onCloseUpdatingProductsModal" />
        <slot
            name="grid"
            :disabled-rows="disabledRows"
            :batch-actions="batchActions" />
    </div>
</template>

<script>
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
} from '@Products/../models/batchActions';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductsBatchActions',
    components: {
        UpdateProductsModal: () => import('@ProductsBatchActions/components/Modals/UpdateProductsModal'),
    },
    data() {
        return {
            disabledRows: {},
            updatingProductsPayload: null,
        };
    },
    computed: {
        ...mapState('batchAction', {
            batchActions: state => state.batchActions,
            removeProductsBatchActions: state => state.batchActions.filter(
                batchAction => batchAction.payload.type === BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
            ),
        }),
        removeBatchActionItem() {
            return {
                label: this.$t('@ProductsBatchActions.productBatchAction.components.ProductsBatchActions.deleteBatchActionLabel'),
                action: ({
                    ids,
                    excludedIds,
                    onApply,
                }) => {
                    this.$confirm({
                        type: MODAL_TYPE.DESTRUCTIVE,
                        title: this.$t('@ProductsBatchActions.productBatchAction.components.ProductsBatchActions.confirmTitle', {
                            info: ids.length,
                        }),
                        subtitle: this.$t('@ProductsBatchActions.productBatchAction.components.ProductsBatchActions.confirmSubtitle'),
                        applyTitle: this.$t('@ProductsBatchActions.productBatchAction.components.ProductsBatchActions.confirmApplyTitle', {
                            info: ids.length,
                        }),
                        action: () => {
                            onApply(ids);

                            const uuid = getUUID();

                            this.setDisabledRows(ids);

                            this.addBatchAction({
                                id: uuid,
                                request: {
                                    type: '$post',
                                    href: 'batch-action',
                                    payload: {
                                        type: BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
                                        filter: {
                                            ids: {
                                                list: ids.length > 0 ? ids : excludedIds,
                                                included: ids.length > 0,
                                            },
                                        },
                                    },
                                },
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
                label: this.$t('@ProductsBatchActions.productBatchAction.components.ProductsBatchActions.editBatchActionLabel'),
                action: ({
                    ids,
                    excludedIds,
                    selectedRowsCount,
                    onApply,
                }) => {
                    this.updatingProductsPayload = {
                        ids,
                        excludedIds,
                        selectedProductsCount: selectedRowsCount,
                        onApply,
                    };
                },
            };
        },
        batchActions() {
            const batchActions = [];

            if (this.$hasAccess([
                PRIVILEGES.PRODUCT.delete,
            ])) {
                batchActions.push(this.removeBatchActionItem);
            }

            if (this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ])) {
                batchActions.push(this.editBatchActionItem);
            }

            return batchActions;
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
            'removeBatchAction',
        ]),
        async onRemoveProductsBatchAction(event) {
            event.detail.request.payload.filter.ids.list.forEach((rowId) => {
                delete this.disabledRows[rowId];
            });

            this.disabledRows = {
                ...this.disabledRows,
            };

            if (!event.detail.error) {
                const batchActionIndex = this.batchActions.findIndex(
                    batchAction => batchAction.id === event.detail.id,
                );

                document.documentElement.removeEventListener(
                    event.detail.id,
                    this.onRemoveProductsBatchAction,
                );
                this.removeBatchAction(batchActionIndex);

                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@ProductsBatchActions.productBatchAction.components.ProductsBatchActions.successAlert'),
                });

                this.$emit('completed');
            }
        },
        onCloseUpdatingProductsModal() {
            this.updatingProductsPayload = null;
        },
        setDisabledRows(ids) {
            ids.forEach((rowId) => {
                this.disabledRows[rowId] = true;
            });

            this.disabledRows = {
                ...this.disabledRows,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .products-batch-actions {
        display: flex;
        flex: 1;
        flex-direction: column;
    }
</style>
