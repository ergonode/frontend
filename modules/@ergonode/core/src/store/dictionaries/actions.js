/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import extendsModules from '~/.nuxt/extends.modules';

const modulesDictionaries = Object.values(extendsModules)
    .reduce((acc, current) => {
        let connectedArray = acc;

        if (current.dictionaries) {
            connectedArray = [
                ...acc,
                ...current.dictionaries,
            ];
        }
        return connectedArray;
    }, []);

export default {
    getDictionaries({
        commit, rootState,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const promises = modulesDictionaries.map(({
            stateProp, requestPath, isGrid = false,
        }) => {
            const path = `${userLanguageCode}${requestPath}${isGrid ? '?view=list' : ''}`;

            return this.app.$axios.$get(path, {
                useCache: isGrid,
            }).then((response) => {
                const value = isGrid ? response.collection : response;

                commit('__SET_STATE', {
                    key: stateProp,
                    value,
                });
            });
        });

        return Promise.all(promises);
    },
    getDictionary({
        commit, rootState,
    }, {
        dictionaryName,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            stateProp,
            requestPath,
            isGrid = false,
        } = modulesDictionaries.find(({
            stateProp: name,
        }) => name === dictionaryName);
        const path = `${userLanguageCode}${requestPath}${isGrid ? '?view=list' : ''}`;

        return this.app.$axios.$get(path).then((response) => {
            const value = isGrid ? response.collection : response;

            commit('__SET_STATE', {
                key: stateProp,
                value,
            });
        });
    },
};
