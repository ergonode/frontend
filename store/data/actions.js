/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

const onError = () => {};

export default {
    getDictionaries({ commit, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;

        const requestConfigs = [
            { stateProp: 'languages', requestPath: `${userLanguageCode}/dictionary/languages` },
            { stateProp: 'currencies', requestPath: `${userLanguageCode}/dictionary/currencies` },
            { stateProp: 'units', requestPath: `${userLanguageCode}/dictionary/units` },
            { stateProp: 'attrTypes', requestPath: `${userLanguageCode}/dictionary/attributes/types` },
            { stateProp: 'dateFormats', requestPath: `${userLanguageCode}/dictionary/date_format` },
            { stateProp: 'privileges', requestPath: `${userLanguageCode}/dictionary/privileges` },
            { stateProp: 'conditions', requestPath: `${userLanguageCode}/dictionary/conditions` },
        ];

        const promises = requestConfigs.map(({ stateProp, requestPath }) => {
            const requestPromise = this.app.$axios.$get(requestPath).then((response) => {
                commit(types.SET_CUSTOM_STATE_PROPERTY, { stateProp, value: response });
            });

            return requestPromise;
        });

        return Promise.all(promises).catch(onError);
    },
    getLanguagesDictionary({ commit, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/dictionary/languages`).then((response) => {
            commit(types.SET_CUSTOM_STATE_PROPERTY, { stateProp: 'languages', value: response });
        });
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
