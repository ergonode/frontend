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
    async getTransitionById(
        { commit, dispatch, rootState },
        { id },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const [source, destination] = id.split('--');

        await this.app.$axios.$get(`${userLanguageCode}/workflow/default/transitions/${source}/${destination}`).then(async ({
            condition_set_id: conditionSetId,
        }) => {
            commit(types.SET_SOURCE, source.replace(/%20/g, ' '));
            commit(types.SET_DESTINATION, destination.replace(/%20/g, ' '));
            commit(types.SET_CONDITION_SET_ID, conditionSetId);
            if (conditionSetId) {
                await dispatch('conditions/getConditionSetById', {
                    conditionSetId,
                }, { root: true });
            }
        }).catch(onDefaultError);
    },
    async createTransition(
        { rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$post(`${userLanguageCode}/workflow/default/transitions`, data).then(() => onSuccess()).catch((e) => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    async updateTransition(
        { state, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { source, destination } = state;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/workflow/default/transitions/${source}/${destination}`, data).then(() => onSuccess()).catch((e) => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeTransition({ state, rootState }, { onSuccess }) {
        const { source, destination, conditionSetId } = state;
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/workflow/default/transitions/${source}/${destination}`)
            .then(() => {
                if (conditionSetId) {
                    this.app.$axios.$delete(`${userLanguageCode}/conditionsets/${conditionSetId}`)
                        .then(() => onSuccess())
                        .catch(onDefaultError);
                } else {
                    onSuccess();
                }
            }).catch(onDefaultError);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
