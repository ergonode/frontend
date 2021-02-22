/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    create,
} from '@BatchActions/services';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'BatchActionsListener',
    data() {
        return {
            executingBatchActions: {},
        };
    },
    computed: {
        ...mapState('batchAction', [
            'actions',
        ]),
    },
    watch: {
        actions() {
            const requests = [];

            this.actions.forEach(({
                id,
                request,
            }) => {
                if (!this.executingBatchActions[id]) {
                    let event = null;

                    this.executingBatchActions[id] = true;

                    requests.push(
                        create({
                            $axios: this.$axios,
                            ...request,
                        }).then(() => {
                            event = new CustomEvent(id, {
                                detail: {
                                    id,
                                    request,
                                },
                            });
                        }).catch((error) => {
                            event = new CustomEvent(id, {
                                detail: {
                                    id,
                                    request,
                                    error,
                                },
                            });
                        }).finally(() => {
                            const batchActionIndex = this.actions.findIndex(
                                batchAction => batchAction.id === id,
                            );

                            this.removeBatchAction(batchActionIndex);

                            delete this.executingBatchActions[id];

                            document.documentElement.dispatchEvent(event);
                        }),
                    );
                }
            });

            Promise.all(requests);
        },
    },
    methods: {
        ...mapActions('batchAction', [
            'removeBatchAction',
        ]),
    },
    render() {
        return this.$slots;
    },
};
</script>
