/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
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
        try {
            const modulesDictionary = modulesDictionaries.find(
                dictionary => dictionary.stateProp === key,
            );

            if (JSON.stringify(state[key]) === JSON.stringify(modulesDictionary.defaultValue)) {
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
        } catch (e) {
            this.app.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Dictionary couldn\'t be fetched',
            });
        }
    },
    async getDictionary({
        commit,
    }, {
        key,
    }) {
        try {
            const modulesDictionary = modulesDictionaries.find(
                dictionary => dictionary.stateProp === key,
            );

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
        } catch (e) {
            this.app.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Dictionary couldn\'t be fetched',
            });
        }
    },
};
