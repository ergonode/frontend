/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    ADD_BINDING: 'ADD_BINDING',
    SET_BINDING: 'SET_BINDING',
    REMOVE_BINDING_ATTRIBUTE: 'REMOVE_BINDING_ATTRIBUTE',
};

export default {
    [types.ADD_BINDING](state) {
        state.bindings.push(null);
    },
    [types.SET_BINDING](state, {
        id, index,
    }) {
        state.bindings[index] = id;
    },
};
