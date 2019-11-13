/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

const onDefaultError = () => {};

export default {
    setId({ commit }, value) {
        commit(types.SET_SEGMENT_ID, value);
    },
    setCode({ commit }, value) {
        commit(types.SET_SEGMENT_CODE, value);
    },
    setConditionSetId({ commit }, value) {
        commit(types.SET_CONDITION_SET_ID, value);
    },
    async getSegmentById(
        { commit, dispatch, rootState },
        { segmentId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        await this.app.$axios.$get(`${userLanguageCode}/segments/${segmentId}`).then(async ({
            id,
            code,
            condition_set_id: conditionSetId,
            name = '',
            description = '',
        }) => {
            const translations = {
                name,
                description,
            };
            commit(types.SET_SEGMENT_ID, id);
            commit(types.SET_SEGMENT_CODE, code);
            commit(types.SET_CONDITION_SET_ID, conditionSetId);
            dispatch('translations/setTabTranslations', translations, { root: true });
            if (conditionSetId) {
                await dispatch('conditions/getConditionSetById', {
                    conditionSetId,
                }, { root: true });
            }
        }).catch(onDefaultError);
    },
    createSegment(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/segments`, data).then(({ id }) => {
            commit(types.SET_SEGMENT_ID, id);
            onSuccess(id);
        }).catch((e) => onError(e.data));
    },
    updateSegment(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/segments/${id}`, data).then(() => onSuccess()).catch((e) => onError(e.data));
    },
    removeSegment({ state, rootState }, { onSuccess }) {
        const { id, conditionSetId } = state;
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/segments/${id}`)
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
