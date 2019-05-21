/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const defaultDuration = 3000;

export default {
    addAlert: ({ commit, dispatch }, alert) => {
        let timeOut = null;
        const {
            id = Math.random().toString(36).substr(2, 9),
            type = 'success',
            message = '',
            duration = defaultDuration,
        } = alert;
        // Create a timeout to dismiss notification
        if (Number.isInteger(duration)) {
            timeOut = setTimeout(() => {
                dispatch('removeAlert', id);
            }, duration);
        }
        commit('appendAlert', { AlertData: { id, type, message }, TimeOut: timeOut });
    },
    removeAlert: ({ commit, state }, index) => {
        const indexToRemove = state.alerts.findIndex(
            alert => alert.AlertData.id === index,
        );
        clearTimeout(state.alerts[indexToRemove].TimeOut);
        commit('removeAlert', indexToRemove);
    },
};
