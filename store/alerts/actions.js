/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { SUCCESS, ALERT_TIME_TO_LEAVE } from '~/defaults/alerts';
import { getUUID } from '~/model/stringWrapper';

export default {
    addAlert({ commit, dispatch }, alert) {
        const id = getUUID();
        const {
            message = '',
            type = SUCCESS,
            duration = ALERT_TIME_TO_LEAVE,
        } = alert;

        const timeOut = setTimeout(() => {
            dispatch('removeAlert', { id });
        }, duration);

        commit(types.APPEND_ALERT, {
            id, type, message, timeOut,
        });
    },
    removeAlert({ commit, state }, { id }) {
        const indexToRemove = state.alerts.findIndex(
            alert => alert.id === id,
        );

        clearTimeout(state.alerts[indexToRemove].timeOut);

        commit(types.REMOVE_ALERT, indexToRemove);
    },
};
