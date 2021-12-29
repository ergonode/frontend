/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TIME_TO_LEAVE,
    SUCCESS,
} from '@Core/defaults/alerts';
import {
    getUUID,
} from '@Core/models/stringWrapper';

import {
    types,
} from './mutations';

export default {
    addAlert({
        commit,
        dispatch,
    }, alert) {
        if (process.client) {
            const id = getUUID();
            const {
                message = '',
                type = SUCCESS,
                duration = ALERT_TIME_TO_LEAVE,
            } = alert;

            const timeOut = setTimeout(() => {
                dispatch('removeAlert', {
                    id,
                });
            }, duration);

            commit(types.ADD_ALERT, {
                id,
                type,
                message,
                timeOut,
            });
        }
    },
    removeAlert({
        commit,
        state,
    }, {
        id,
    }) {
        const indexToRemove = state.alerts.findIndex(
            alert => alert.id === id,
        );

        if (indexToRemove > -1) {
            clearTimeout(state.alerts[indexToRemove].timeOut);

            commit(types.REMOVE_ALERT, indexToRemove);
        }
    },
};
