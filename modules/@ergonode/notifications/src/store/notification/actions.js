/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    checkNotificationCount({
        commit, dispatch,
    }) {
        return this.app.$axios.$get('profile/notifications/check', {
            withLanguage: false,
        }).then(({
            unread,
        }) => {
            dispatch('increaseRequestTimeInterval');
            dispatch('setRequestTimeout');

            commit('__SET_STATE', {
                key: 'count',
                value: unread,
            });
        });
    },
    async requestForNotifications({
        commit, state,
    }) {
        const params = {
            limit: state.limit,
            offset: 0,
            order: 'DESC',
            field: 'created_at',
        };

        await this.$setLoader('moreNotifications');
        await this.app.$axios.$get('profile/notifications', {
            params,
            withLanguage: false,
        }).then(({
            collection,
        }) => {
            commit('__SET_STATE', {
                key: 'notifications',
                value: collection,
            });
        });
        await this.$removeLoader('moreNotifications');
    },
    markNotificationAsRead({
        dispatch,
    }, {
        id,
    }) {
        return this.app.$axios.$post(`profile/notifications/${id}/mark`, {
            withLanguage: false,
        }).then(() => {
            dispatch('checkNotificationCount');
            dispatch('requestForNotifications');
        });
    },
    increaseRequestTimeInterval({
        commit, state,
    }) {
        const {
            requestTimeInterval,
        } = state;
        const fiveMinutesInMs = 300000;
        const isGreaterThanFiveMinutes = requestTimeInterval === fiveMinutesInMs
            || requestTimeInterval * 2 > fiveMinutesInMs;
        const updatedInterval = isGreaterThanFiveMinutes
            ? fiveMinutesInMs
            : requestTimeInterval * 2;

        commit('__SET_STATE', {
            key: 'requestTimeInterval',
            value: updatedInterval,
        });
    },
    setRequestTimeout({
        commit, dispatch, state,
    }) {
        dispatch('invalidateRequestTimeout');

        const timeout = setTimeout(() => {
            dispatch('checkNotificationCount');
        }, state.requestTimeInterval);

        commit('__SET_STATE', {
            key: 'requestTimeout',
            value: timeout,
        });
    },
    invalidateRequestTimeout({
        commit, state,
    }) {
        clearTimeout(state.requestTimeout);
        commit('__SET_STATE', {
            key: 'requestTimeout',
            value: null,
        });
    },
};
