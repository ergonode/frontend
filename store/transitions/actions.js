/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

const onDefaultError = () => {};

export default {
    setSource({ commit }, value) {
        commit(types.SET_SOURCE, value);
    },
    setDestination({ commit }, value) {
        commit(types.SET_DESTINATION, value);
    },
    setConditionSetId({ commit }, value) {
        commit(types.SET_CONDITION_SET_ID, value);
    },
    getTransition(
        { commit, rootState },
        { id },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const [source, destination] = id.split('--');

        return this.app.$axios.$get(`${userLanguageCode}/workflow/default/transitions/${source}/${destination}`).then(({
            condition_set: conditionSetId,
        }) => {
            commit(types.SET_SOURCE, source.replace(/%20/g, ' '));
            commit(types.SET_DESTINATION, destination.replace(/%20/g, ' '));
            commit(types.SET_CONDITION_SET_ID, conditionSetId);
            if (conditionSetId) {
                console.log('pobieramy conditions');
                // dispatch('conditions/getConditionSetById', {
                //     conditionSetId: params.id,
                // });
            }
        }).catch(onDefaultError);
    },
    createTransition(
        { rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/workflow/default/transitions`, data).then(() => onSuccess()).catch((e) => onError(e.data));
    },
    updateTransition(
        { state, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { source, destination } = state;
        return this.app.$axios.$put(`${userLanguageCode}/workflow/default/transitions/${source}/${destination}`, data).then(() => onSuccess()).catch((e) => onError(e.data));
    },
    removeTransition({ state, rootState }, { onSuccess }) {
        const { source, destination } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/workflow/default/transitions/${source}/${destination}`).then(() => onSuccess()).catch(onDefaultError);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
