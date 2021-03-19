/* eslint-disable no-param-reassign */
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    USER_INTERFACE_LANGUAGE_KEY,
} from '@Authentication/defaults/cookies';
import {
    DEFAULT_LANGUAGE_CODE,
} from '@Core/defaults/cookies';

const setI18nLanguage = async ({
    i18n,
    languageCode,
}) => {
    let messages = '';

    try {
        messages = require(`@/.nuxt/locales/${languageCode}`);
    } catch (e) {
        console.warn(`No translation file for language ${languageCode}`);

        messages = require(`@/.nuxt/locales/${DEFAULT_LANGUAGE_CODE}`);
    }

    i18n.setLocaleMessage(languageCode, messages);

    await i18n.setLocale(languageCode);
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
