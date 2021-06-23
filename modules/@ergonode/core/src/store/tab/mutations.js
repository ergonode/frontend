/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeObjectProperty,
} from '@Core/models/objectWrapper';

export const types = {
    SET_TRANSLATIONS: 'SET_TRANSLATIONS',
    SET_TRANSLATION_VALUE: 'SET_TRANSLATION_VALUE',
    REMOVE_TRANSLATION_VALUE: 'REMOVE_TRANSLATION_VALUE',
};
export default {
    [types.SET_TRANSLATIONS](state, translations) {
        state.translations = translations;
    },
    [types.SET_TRANSLATION_VALUE](state, {
        languageCode, propertyName, value,
    }) {
        state.translations[propertyName] = {
            ...state.translations[propertyName],
            [languageCode]: value,
        };
    },
    [types.REMOVE_TRANSLATION_VALUE](state, {
        languageCode, propertyName,
    }) {
        state.translations[propertyName] = removeObjectProperty(
            state.translations[propertyName],
            languageCode,
        );
    },

};
