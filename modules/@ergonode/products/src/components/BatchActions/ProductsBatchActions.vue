/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

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
import PRIVILEGES from '@Products/config/privileges';
import {
    BATCH_ACTION_TYPE,
} from '@Products/models/batchActions';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductsBatchActions',
    data() {
        return {
            disabledRows: {},
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
                label: 'Delete selected products',
                action: ({
                    ids,
                    onApply,
                }) => {
                    this.$confirm({
                        type: MODAL_TYPE.DESTRUCTIVE,
                        title: this.$t('@Products.batchAction.components.ProductsBatchActions.confirmTitle', {
                            info: ids.length,
                        }),
                        subtitle: this.$t('@Products.batchAction.components.ProductsBatchActions.confirmSubtitle'),
                        applyTitle: this.$t('@Products.batchAction.components.ProductsBatchActions.confirmApplyTitle', {
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
                                                list: ids,
                                                included: true,
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
        batchActions() {
            if (!this.$hasAccess([
                PRIVILEGES.PRODUCT.delete,
            ])) {
                return [];
            }

            return [
                this.removeBatchActionItem,
            ];
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
                    message: this.$t('@Products.batchAction.components.ProductsBatchActions.successAlert'),
                });

                this.$emit('batch-action-completed');
            }
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
    render() {
        return this.$scopedSlots.default({
            disabledRows: this.disabledRows,
            batchActions: this.batchActions,
        });
    },
};
</script>
