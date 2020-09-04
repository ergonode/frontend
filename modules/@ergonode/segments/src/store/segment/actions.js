/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    remove,
    update,
} from '@Segments/services/index';

export default {
    async getSegment(
        {
            commit,
            dispatch,
        },
        {
            id,
        },
    ) {
        const {
            code,
            condition_set_id: conditionSetId,
            name = '',
            description = '',
        } = await get({
            $axios: this.app.$axios,
            id,
        });

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
    },
    async updateSegment(
        {
            state,
            rootState,
        },
        {
            conditionSetId,
            onSuccess,
            onError,
        },
    ) {
        this.$setLoader('footerButton');

        const {
            translations: {
                name,
                description,
            },
        } = rootState.tab;

        const {
            id,
        } = state;

        const data = {
            name,
            description,
            condition_set_id: conditionSetId,
        };

        try {
            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }

        this.$removeLoader('footerButton');
    },
    async createTransition(
        {
            state,
            commit,
        },
        {
            onSuccess,
            onError,
        },
    ) {
        try {
            const {
                code,
            } = state;

            const data = {
                code,
            };

            await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeSegment({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id, conditionSetId,
        } = state;

        await remove({
            $axios: this.app.$axios,
            id,
        });

        if (conditionSetId) {
            this.app.$axios.$delete(`conditionsets/${conditionSetId}`);
        }

        onSuccess();
    },
};
