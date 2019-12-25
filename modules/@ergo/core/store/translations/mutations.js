/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    ADD_CARD_LANGUAGE_CODE: 'ADD_CARD_LANGUAGE_CODE',
    REMOVE_CARD_LANGUAGE_CODE: 'REMOVE_CARD_LANGUAGE_CODE',
    SET_TAB_TRANSLATIONS: 'SET_TAB_TRANSLATIONS',
    SET_MULTILINGUAL_TRANSLATION_PROPERTY_VALUE: 'SET_MULTILINGUAL_TRANSLATION_PROPERTY_VALUE',
    CLEAR_STATE: 'CLEAR_STATE',
};
export default {
    [types.ADD_CARD_LANGUAGE_CODE](state, { languageCode }) {
        state.cardsLanguageCodes.push(languageCode);
    },
    [types.REMOVE_CARD_LANGUAGE_CODE](state, { index }) {
        state.cardsLanguageCodes.splice(index, 1);
    },
    [types.SET_TAB_TRANSLATIONS](state, translations) {
        state.translations = { ...translations };
    },
    [types.SET_MULTILINGUAL_TRANSLATION_PROPERTY_VALUE](state, {
        languageCode, propertyName, value, isMultilingual,
    }) {
        if (isMultilingual) {
            state.translations[propertyName] = {
                ...state.translations[propertyName],
                [languageCode]: value,
            };
        } else {
            state.translations[propertyName] = value;
        }
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
