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
                batchAction => batchAction.type === BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
            ),
        }),
        batchActions() {
            return [
                {
                    label: 'Delete selected products',
                    action: ({
                        payload,
                        onSuccess,
                    }) => {
                        const {
                            rowIds,
                        } = payload;

                        this.$confirm({
                            type: MODAL_TYPE.DESTRUCTIVE,
                            title: `Are you sure you want to permanently delete ${rowIds.length} products?`,
                            subtitle: 'The products will be deleted from the system forever and cannot be restored.',
                            applyTitle: `DELETE ${rowIds.length} PRODUCTS`,
                            action: () => {
                                const uuid = getUUID();

                                rowIds.forEach((rowId) => {
                                    this.disabledRows[rowId] = true;
                                });

                                this.disabledRows = {
                                    ...this.disabledRows,
                                };

                                this.addBatchAction({
                                    id: uuid,
                                    type: BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
                                    href: 'batch-action',
                                    payload: {
                                        ids: rowIds,
                                    },
                                });

                                document
                                    .documentElement
                                    .addEventListener(
                                        uuid,
                                        this.onRemoveProductsBatchAction.bind(null, onSuccess),
                                    );
                            },
                        });
                    },
                },
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
        async onRemoveProductsBatchAction(onSuccess = () => {}, event) {
            await onSuccess();

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been removed',
            });

            const {
                id,
                payload: {
                    ids,
                },
            } = event.detail;

            const batchActionIndex = this.batchActions
                .findIndex(batchAction => batchAction.id === id);

            ids.forEach((rowId) => {
                delete this.disabledRows[rowId];
            });

            this.disabledRows = {
                ...this.disabledRows,
            };

            document
                .documentElement
                .removeEventListener(id, this.onRemoveProductsBatchAction);
            this.removeBatchAction(batchActionIndex);

            this.$emit('batch-action-completed');
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
