/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DRAFT_VALUE: 'SET_DRAFT_VALUE',
    SET_BINDING_ATTRIBUTE_ID: 'SET_BINDING_ATTRIBUTE_ID',
    ADD_BINDING_ATTRIBUTE: 'ADD_BINDING_ATTRIBUTE',
    REMOVE_BINDING_ATTRIBUTE: 'REMOVE_BINDING_ATTRIBUTE',
    SET_PRODUCT_DRAFT: 'SET_PRODUCT_DRAFT',
};

export default {
    [types.SET_BINDING_ATTRIBUTE_ID](state, {
        index, id,
    }) {
        state.bindingAttributesIds[index] = id;
        state.bindingAttributesIds = [
            ...state.bindingAttributesIds,
        ];
    },
    [types.ADD_BINDING_ATTRIBUTE](state) {
        state.bindingAttributesIds.push(null);
    },
    [types.REMOVE_BINDING_ATTRIBUTE](state, index) {
        state.bindingAttributesIds.splice(index, 1);
    },
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
