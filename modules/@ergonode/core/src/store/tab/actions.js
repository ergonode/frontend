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
    }, params) {
        commit(types.SET_TRANSLATION_VALUE, params);
    },
};
