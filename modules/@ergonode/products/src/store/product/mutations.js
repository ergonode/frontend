/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DRAFT_VALUE: 'SET_DRAFT_VALUE',
    SET_PRODUCT_DRAFT: 'SET_PRODUCT_DRAFT',
};

export default {
    [types.SET_PRODUCT_DRAFT](state, {
        languageCode, draft,
    }) {
        state.draft = {
            ...state.draft,
            [languageCode]: draft,
        };
    },
    [types.SET_DRAFT_VALUE](state, {
        languageCode, key, value,
    }) {
        state.draft[languageCode] = {
            ...state.draft[languageCode],
            [key]: value,
        };
    },
};
