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
                    payload,
                    onSuccess,
                    onError,
                }) => {
                    const {
                        ids,
                    } = payload;

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
                            const uuid = getUUID();

                            ids.forEach((rowId) => {
                                this.disabledRows[rowId] = true;
                            });

                            this.disabledRows = {
                                ...this.disabledRows,
                            };

                            this.addBatchAction({
                                id: uuid,
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
                            });

                            document
                                .documentElement
                                .addEventListener(
                                    uuid,
                                    this.onRemoveProductsBatchAction.bind(
                                        null,
                                        payload,
                                        onSuccess,
                                        onError,
                                    ),
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
            document
                .documentElement
                .addEventListener(id, this.onRemoveProductsBatchAction);
        });
    },
    beforeDestroy() {
        this.removeProductsBatchActions.forEach(({
            id,
        }) => {
            document
                .documentElement
                .removeEventListener(id, this.onRemoveProductsBatchAction);
        });
    },
    methods: {
        ...mapActions('batchAction', [
            'addBatchAction',
            'removeBatchAction',
        ]),
        async onRemoveProductsBatchAction(
            payload,
            onSuccess = () => {},
            onError = () => {},
            event,
        ) {
            const {
                ids,
            } = payload;

            ids.forEach((rowId) => {
                delete this.disabledRows[rowId];
            });

            this.disabledRows = {
                ...this.disabledRows,
            };

            if (event.detail.error) {
                await onError(payload);
            } else {
                const {
                    id,
                } = event.detail;

                await onSuccess(payload);

                const batchActionIndex = this.batchActions
                    .findIndex(batchAction => batchAction.id === id);

                document
                    .documentElement
                    .removeEventListener(id, this.onRemoveProductsBatchAction);
                this.removeBatchAction(batchActionIndex);

                this.$emit('batch-action-completed');

                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@Products.batchAction.components.ProductsBatchActions.successAlert'),
                });
            }
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
