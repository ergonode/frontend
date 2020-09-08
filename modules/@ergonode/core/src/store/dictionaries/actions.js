/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    get,
} from '@Core/services/dictionary/index';

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
    async getDictionaries({
        commit,
    }) {
        const promises = modulesDictionaries.map(async ({
            stateProp, requestPath, isGrid = false,
        }) => {
            const path = `${requestPath}${isGrid ? '?view=list' : ''}`;

            const response = await get({
                $axios: this.app.$axios,
                path,
                useCache: isGrid,
            });

            const value = isGrid ? response.collection : response;

            commit('__SET_STATE', {
                key: stateProp,
                value,
            });
        });

        await Promise.all(promises);
    },
    async getCurrentDictionary({
        commit,
    }, {
        dictionaryName,
    }) {
        const {
            stateProp,
            requestPath,
            isGrid = false,
        } = modulesDictionaries.find(({
            stateProp: name,
        }) => name === dictionaryName);
        const path = `${requestPath}${isGrid ? '?view=list' : ''}`;

        const response = await get({
            $axios: this.app.$axios,
            path,
            useCache: isGrid,
        });

        const value = isGrid ? response.collection : response;

        commit('__SET_STATE', {
            key: stateProp,
            value,
        });
    },
};
