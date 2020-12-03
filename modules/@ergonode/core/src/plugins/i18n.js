/* eslint-disable no-param-reassign */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default async ({
    app, store,
}, inject) => {
    const DEFAULT_LANGUAGE = app.i18n.fallbackLocale;
    const loadedLanguages = [];
    let language = DEFAULT_LANGUAGE;
    const {
        user,
    } = store.state.authentication;
    if (user) {
        language = user.language;
    }

    const setI18nLanguage = ({
        lang, message,
    }) => {
        app.i18n.setLocaleMessage(lang, message);
        loadedLanguages.push(lang);
        app.i18n.locale = lang;
    };
    const loadLanguageAsync = async (lang) => {
        if (app.i18n.locale === lang || loadedLanguages.includes(lang)) {
            app.i18n.locale = lang;
        } else {
            try {
                if (!loadedLanguages.length) {
                    const defaultMessage = await import(`@/.nuxt/locales/${DEFAULT_LANGUAGE}`);

                    setI18nLanguage({
                        lang: DEFAULT_LANGUAGE,
                        message: defaultMessage.default,
                    });
                }
                const message = await import(`@/.nuxt/locales/${lang}`);

                setI18nLanguage({
                    lang,
                    message: message.default,
                });
            } catch (e) {
                app.i18n.locale = DEFAULT_LANGUAGE;
            }
        }
    };

    loadLanguageAsync(language);

    inject('setInterfaceLanguage', async (lang) => {
        await loadLanguageAsync(lang);
    });
};
