/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import types from './mutation-types';
import { SUCCESS, ALERT_TIME_TO_LEAVE } from '~/defaults/alerts';

export default {
    addAlert({ commit, dispatch }, alert) {
        const id = Math.random().toString(36).substr(2, 9);
        const {
            message = '',
            type = SUCCESS,
        } = alert;

        const timeOut = setTimeout(() => {
            dispatch('removeAlert', id);
        }, ALERT_TIME_TO_LEAVE);

        commit(types.APPEND_ALERT, { AlertData: { id, type, message }, timeOut });
    },
    removeAlert({ commit, state }, index) {
        const indexToRemove = state.alerts.findIndex(
            alert => alert.AlertData.id === index,
        );

        clearTimeout(state.alerts[indexToRemove].timeOut);

        commit(types.REMOVE_ALERT, indexToRemove);
    },
};
