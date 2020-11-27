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
    async getInitialDictionary({
        commit,
        state,
    }, {
        key,
    }) {
        const modulesDictionary = modulesDictionaries.find(
            dictionary => dictionary.stateProp === key,
        );

        if (modulesDictionary
            && JSON.stringify(state[key]) === JSON.stringify(modulesDictionary.defaultValue)) {
            const {
                request: {
                    path,
                    config,
                },
                dataMapper = response => response,
            } = modulesDictionary;

            const response = await get({
                $axios: this.app.$axios,
                path,
                config,
            });

            commit('__SET_STATE', {
                key,
                value: dataMapper(response),
            });
        }
    },
    async getDictionary({
        commit,
    }, {
        key,
    }) {
        const modulesDictionary = modulesDictionaries.find(
            dictionary => dictionary.stateProp === key,
        );

        if (modulesDictionary) {
            const {
                request: {
                    path,
                    config,
                },
                dataMapper = response => response,
            } = modulesDictionary;

            const response = await get({
                $axios: this.app.$axios,
                path,
                config,
            });

            commit('__SET_STATE', {
                key,
                value: dataMapper(response),
            });
        }
    },
};
