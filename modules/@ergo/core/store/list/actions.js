/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setDisabledElement: ({ commit }, payload) => {
        console.log(payload);
        commit(types.SET_DISABLED_ELEMENT, payload);
    },
    setDisabledElements: ({ commit }, disabledElements) => {
        commit(types.SET_DISABLED_ELEMENTS, disabledElements);
    },
    removeDisabledElement: ({ commit }, payload) => {
        commit(types.REMOVE_DISABLED_ELEMENT, payload);
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};
