/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setNotificationsLimit({ commit }, limit) {
        commit(types.SET_NOTIFICATIONS_LIMIT, limit);
    },
    async requestForNotifications({ commit, dispatch, state }) {
        const params = {
            limit: state.limit,
            offset: 0,
        };

        await this.$setLoader('moreNotifications');
        await this.app.$axios.$get('profile/notifications', { params }).then(({ collection, info }) => {
            dispatch('increaseRequestTimeInterval');
            dispatch('setRequestTimeout');
            commit(types.SET_NOTIFICATIONS, collection);
            commit(types.SET_NOTIFICATIONS_COUNT, info.count);
        });
        await this.$removeLoader('moreNotifications');
    },
    increaseRequestTimeInterval({ commit, state }) {
        const { requestTimeInterval } = state;
        const fiveMinutesInMs = 300000;
        const isGreaterThanFiveMinutes = requestTimeInterval === fiveMinutesInMs
            || requestTimeInterval * 2 > fiveMinutesInMs;
        const updatedInterval = isGreaterThanFiveMinutes
            ? fiveMinutesInMs
            : requestTimeInterval * 2;

        commit(types.SET_REQUEST_TIME_INTERVAL, updatedInterval);
    },
    setRequestTimeout({ commit, dispatch, state }) {
        dispatch('invalidateRequestTimeout');

        const timeout = setTimeout(() => {
            dispatch('requestForNotifications');
        }, state.requestTimeInterval);

        commit(types.SET_REQUEST_TIMEOUT, timeout);
    },
    invalidateRequestTimeout({ commit, state }) {
        clearTimeout(state.requestTimeout);
        commit(types.SET_REQUEST_TIMEOUT);
    },
    clearStorage: ({ commit }) => {
        commit(types.CLEAR_STATE);
    },
};
