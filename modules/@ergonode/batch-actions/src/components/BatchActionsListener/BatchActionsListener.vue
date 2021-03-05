/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    create,
    getStatus,
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
            statusesBatchActions: {},
        };
    },
    // watch: {
    //     actions() {
    //         const requests = [];
    //
    //         this.actions.forEach(({
    //             id,
    //             request,
    //         }) => {
    //             if (!this.executingBatchActions[id]) {
    //                 let event = null;
    //
    //                 this.executingBatchActions[id] = true;
    //
    //                 requests.push(
    //                     create({
    //                         $axios: this.$axios,
    //                         ...request,
    //                     }).then(({
    //                         id: actionId,
    //                     }) => {
    //                         // return getStatus({
    //                         //     $axios: this.$axios,
    //                         //     id: actionId,
    //                         // }).then(() => {
    //                         //     event = new CustomEvent(id, {
    //                         //         detail: {
    //                         //             id,
    //                         //             request,
    //                         //         },
    //                         //     });
    //                         // })
    //                         // this.statusesBatchActions[actionId] = {};
    //                     }).catch((error) => {
    //                         event = new CustomEvent(id, {
    //                             detail: {
    //                                 id,
    //                                 request,
    //                                 error,
    //                             },
    //                         });
    //                     }).finally(() => {
    //                         this.removeBatchAction(id);
    //
    //                         delete this.executingBatchActions[id];
    //
    //                         document.documentElement.dispatchEvent(event);
    //                     }),
    //                 );
    //             }
    //         });
    //
    //         Promise.all(requests);
    //     },
    // },
    methods: {
        ...mapActions('batchAction', [
            'removeBatchAction',
            'updateBatchAction',
        ]),
        addBatchActionStatusToQueue() {

        },
    },
    render() {
        return this.$slots;
    },
};
</script>
