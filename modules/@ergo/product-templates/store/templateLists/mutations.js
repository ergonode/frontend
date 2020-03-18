/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_TEMPLATES_SECTION_ELEMENTS: 'SET_TEMPLATES_SECTION_ELEMENTS',
    SET_TEMPLATES_SECTION: 'SET_TEMPLATES_SECTION',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_TEMPLATES_SECTION_ELEMENTS](state, payload) {
        state.templatesSectionElements = payload;
    },
    [types.SET_TEMPLATES_SECTION](state, payload) {
        state.templatesSection = payload;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
