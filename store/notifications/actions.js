/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setNotificationsLimit({ commit }, limit) {
        commit(types.SET_NOTIFICATIONS_LIMIT, limit);
    },
    checkNotificationCount({ commit, dispatch }) {
        return this.app.$axios.$get('profile/notifications/check').then(({ unread }) => {
            dispatch('increaseRequestTimeInterval');
            dispatch('setRequestTimeout');
            commit(types.SET_NOTIFICATIONS_COUNT, unread);
        });
    },
    async requestForNotifications({ commit, state }) {
        const params = {
            limit: state.limit,
            offset: 0,
            order: 'DESC',
            field: 'created_at',
        };

        await this.$setLoader('moreNotifications');
        await this.app.$axios.$get('profile/notifications', { params }).then(({ collection }) => {
            commit(types.SET_NOTIFICATIONS, collection);
        });
        await this.$removeLoader('moreNotifications');
    },
    markNotificationAsRead({ dispatch }, { id }) {
        return this.app.$axios.$post(`profile/notifications/${id}/mark`).then(() => {
            dispatch('checkNotificationCount');
            dispatch('requestForNotifications');
        });
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
            dispatch('checkNotificationCount');
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
