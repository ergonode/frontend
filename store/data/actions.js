/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getDictionaries({ commit, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const callPaths = [
            { mutation: 'languages', path: `${userLanguageCode}/dictionary/languages` },
            { mutation: 'currencies', path: `${userLanguageCode}/dictionary/currencies` },
            { mutation: 'units', path: `${userLanguageCode}/dictionary/units` },
            { mutation: 'attrTypes', path: `${userLanguageCode}/dictionary/attributes/types` },
            { mutation: 'attrGroups', path: `${userLanguageCode}/dictionary/attributes/groups` },
            { mutation: 'dateFormats', path: `${userLanguageCode}/dictionary/date_format` },
            { mutation: 'imageFormats', path: `${userLanguageCode}/dictionary/image_format` },
        ];
        const promises = [];

        callPaths.forEach(({ mutation, path }) => {
            promises.push(this.app.$axios.$get(path).then(response => new Promise(((resolve) => {
                resolve([response, mutation]);
            }))));
        });

        return Promise.all(promises).then((data) => {
            data.forEach((element) => {
                if (element) {
                    const [value, key] = element;
                    commit('setState', { key, value });
                }
            });
        }).catch(e => console.log(e));
    },
    clearAllData: ({ commit }) => {
        commit('clearStorage');
    },
};
