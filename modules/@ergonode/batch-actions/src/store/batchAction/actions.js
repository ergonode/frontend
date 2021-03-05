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
            commit(types.ADD_ACTION_TO_QUEUE, payload);

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
};
