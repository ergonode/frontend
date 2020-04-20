/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_SELECT_TREE: 'SET_SELECT_TREE',
    SET_OPTION: 'SET_OPTION',
    SET_OPTIONS: 'SET_OPTIONS',
};

export default {
    [types.SET_SELECT_TREE](state, { label, options }) {
        state.selectTrees[label] = options;
    },
    [types.SET_OPTION](state, { label, option }) {
        state.selectedOptions[label] = {
            id: option.id,
            key: option.key,
            value: option.name,
        };
    },
    [types.SET_OPTIONS](state, { label, option }) {
        const options = state.selectedOptions[label] || [];
        const index = options.findIndex(({ id }) => id === option.id);

        if (index > -1) {
            options.splice(index, 1);
        } else {
            options.push({
                id: option.id,
                key: option.key,
                value: option.name,
            });
        }
        state.selectedOptions = {
            ...state.selectedOptions,
            [label]: options,
        };
    },
};
