/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    setTranslations({
        commit,
    }, translation) {
        commit(types.SET_TRANSLATIONS, translation);
    },
    setTranslationValue({
        commit,
    }, {
        languageCode,
        propertyName,
        value,
    }) {
        if (value) {
            commit(types.SET_TRANSLATION_VALUE, {
                value,
                propertyName,
                languageCode,
            });
        } else {
            commit(types.REMOVE_TRANSLATION_VALUE, {
                propertyName,
                languageCode,
            });
        }
    },
};
