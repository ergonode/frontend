/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import unitService from '@Core/services/units';

export default {
    async createUnit({
        state, rootState,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            name,
            symbol,
        } = state;
        const data = {
            name,
            symbol,
        };
        const id = await unitService.create({
            $axios: this.app.$axios,
            languageCode: userLanguageCode,
            data,
        });

        this.app.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'Unit created',
        });

        return id;
    },
    async getUnit(
        {
            commit, rootState,
        },
        {
            unitId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.app.$axios.$get(`${userLanguageCode}/units/${unitId}`).then(async ({
            id,
            name = '',
            symbol = '',
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name,
            });
            commit('__SET_STATE', {
                key: 'symbol',
                value: symbol,
            });
        });
    },
    async updateUnit(
        {
            state,
            rootState,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            id,
            name,
            symbol,
        } = state;
        const data = {
            name,
            symbol,
        };
        await unitService.update(({
            $axios: this.app.$axios,
            languageCode: userLanguageCode,
            id,
            data,
        }));
        await this.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'Unit updated',
        });
    },
    removeUnit({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/units/${id}`)
            .then(() => {
                onSuccess();
            });
    },
};
