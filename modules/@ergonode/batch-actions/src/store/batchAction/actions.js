/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    getStatus,
} from '@BatchActions/services';

import {
    types,
} from './mutations';

export default {
    async addBatchAction({
        commit,
    }, payload) {
        const {
            id,
            request,
        } = payload;

        try {
            const {
                id: actionId,
            } = await create({
                $axios: this.app.$axios,
                ...request,
            });

            commit(types.ADD_ACTION_TO_QUEUE, {
                actionId,
                ...payload,
            });
        } catch (error) {
            const event = new CustomEvent(id, {
                detail: {
                    id,
                    request,
                    error,
                },
            });

            document.documentElement.dispatchEvent(event);
        }
    },
    async getActionStatus({
        state,
        commit,
    }, action) {
        const {
            id,
            actionId,
            request,
        } = action;

        try {
            const {
                all_entries,
                processed_entries,
            } = await getStatus({
                $axios: this.app.$axios,
                id: actionId,
            });

            if (all_entries === processed_entries) {
                const event = new CustomEvent(id, {
                    detail: {
                        id,
                        request,
                    },
                });

                document.documentElement.dispatchEvent(event);

                commit(
                    types.REMOVE_ACTION_FROM_QUEUE,
                    state.actionsQueue.findIndex(actionQueue => actionQueue.id === id),
                );
            }
        } catch (error) {
            const event = new CustomEvent(id, {
                detail: {
                    id,
                    request,
                    error,
                },
            });

            document.documentElement.dispatchEvent(event);

            commit(
                types.REMOVE_ACTION_FROM_QUEUE,
                state.actionsQueue.findIndex(actionQueue => actionQueue.id === id),
            );
        }
    },
};
