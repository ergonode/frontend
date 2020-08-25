/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeObjectProperty,
} from '@Core/models/objectWrapper';

export const types = {
    SET_TAB_TRANSLATIONS: 'SET_TAB_TRANSLATIONS',
    SET_MULTILINGUAL_TRANSLATION_PROPERTY_VALUE: 'SET_MULTILINGUAL_TRANSLATION_PROPERTY_VALUE',
};
export default {
    [types.SET_TAB_TRANSLATIONS](state, translations) {
        state.translations = {
            ...translations,
        };
    },
    [types.SET_MULTILINGUAL_TRANSLATION_PROPERTY_VALUE](state, {
        languageCode, propertyName, value,
    }) {
        if (!value) {
            state.translations[propertyName] = removeObjectProperty(
                state.translations[propertyName],
                languageCode,
            );
        } else {
            state.translations[propertyName] = {
                ...state.translations[propertyName],
                [languageCode]: value,
            };
        }
    },
};
