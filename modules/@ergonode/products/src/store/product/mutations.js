/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DRAFT_VALUE: 'SET_DRAFT_VALUE',
};

export default {
    [types.SET_DRAFT_VALUE](state, {
        languageCode,
        key,
        value,
    }) {
        state.drafts[languageCode] = {
            ...state.drafts[languageCode],
            [key]: value,
        };
    },
};
