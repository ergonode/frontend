/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    async getSegment(
        {
            commit, dispatch, rootState,
        },
        {
            segmentId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
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
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'conditionSetId',
                value: conditionSetId,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });
            if (conditionSetId) {
                await dispatch('condition/getConditionSet', {
                    conditionSetId,
                }, {
                    root: true,
                });
            }
        });
    },
    async updateSegment(
        {
            rootState,
        },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/segments/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeSegment({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id, conditionSetId,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/segments/${id}`)
            .then(() => {
                if (conditionSetId) {
                    this.app.$axios.$delete(`${userLanguageCode}/conditionsets/${conditionSetId}`)
                        .then(() => onSuccess());
                } else {
                    onSuccess();
                }
            });
    },
};
