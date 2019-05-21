/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    appendAlert: (state, payload) => {
        state.alerts.push(payload);
    },
    removeAlert: (state, index) => {
        state.alerts.splice(index, 1);
    },
};
