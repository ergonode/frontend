/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { SUCCESS, ALERT_TIME_TO_LEAVE } from '@Core/defaults/alerts';
import { getUUID } from '@Core/models/stringWrapper';
import { types } from './mutations';

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

        commit(types.ADD_ALERT, {
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
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
