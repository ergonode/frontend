/* eslint-disable no-param-reassign */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    USER_INTERFACE_LANGUAGE_KEY,
} from '@Authentication/defaults/cookies';
import {
    DEFAULT_LANGUAGE_CODE,
} from '@Core/defaults/cookies';

const languages = [];

const setI18nLanguage = async ({
    i18n,
    languageCode,
}) => {
    try {
        if (!languages.includes(languageCode)) {
            const messages = await import(`@/.nuxt/locales/${languageCode}`);

            languages.push(languageCode);
            i18n.setLocaleMessage(languageCode, messages);
        }

        i18n.locale = languageCode;
    } catch (e) {
        console.warn(`No translation file for language ${languageCode}`);

        languageCode = DEFAULT_LANGUAGE_CODE;

        if (!languages.includes(languageCode)) {
            const messages = await import(`@/.nuxt/locales/${languageCode}`);

            languages.push(languageCode);
            i18n.setLocaleMessage(languageCode, messages);
        }

        i18n.locale = languageCode;
    }
};

export default async ({
    app,
}, inject) => {
    const defaultLanguageCode = app.$cookies.get(USER_INTERFACE_LANGUAGE_KEY);

    await setI18nLanguage({
        i18n: app.i18n,
        languageCode: defaultLanguageCode || DEFAULT_LANGUAGE_CODE,
    });

    inject('setInterfaceLanguage', async (languageCode) => {
        await setI18nLanguage({
            i18n: app.i18n,
            languageCode,
        });
    });
};
