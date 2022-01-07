/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
    async getInitialDictionaries({
        commit,
        state,
    }, {
        keys,
    }) {
        const requests = [];

        keys.forEach((key) => {
            requests.push(async () => {
                try {
                    const modulesDictionary = modulesDictionaries.find(
                        dictionary => dictionary.stateProp === key,
                    );

                    const stateValue = JSON.stringify(state[key]);
                    const dictionaryDefaultValue = JSON.stringify(modulesDictionary.defaultValue);

                    if (stateValue === dictionaryDefaultValue) {
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
                            value: dataMapper(response, this.app),
                        });
                    }
                } catch (e) {
                    this.app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Dictionary couldn\'t be fetched',
                    });
                }
            });
        });

        await Promise.all(requests.map(request => request()));
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
