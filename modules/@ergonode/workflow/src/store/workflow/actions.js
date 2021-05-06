/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    getStatuses,
    getTransitions,
} from '@Modules/@ergonode/workflow/src/services';

export default {
    async getWorkflow({
        commit,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const [
                statusesResponse,
                transitionsResponse,
            ] = await Promise.all([
                getStatuses({
                    $axios: this.app.$axios,
                }),
                getTransitions({
                    $axios: this.app.$axios,
                }),
            ]);

            const statusColumn = statusesResponse.columns.find(column => column.id === 'status');

            commit('__SET_STATE', {
                key: 'statuses',
                value: statusesResponse.collection.map(status => ({
                    ...status,
                    color: statusColumn.filter.options[status.id].color,
                })),
            });
            commit('__SET_STATE', {
                key: 'transitions',
                value: transitionsResponse.collection,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
};
