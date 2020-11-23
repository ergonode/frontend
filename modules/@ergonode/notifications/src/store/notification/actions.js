/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    check,
    getAll,
    update,
} from '@Notifications/services/index';

export default {
    async checkNotificationCount({
        commit,
        dispatch,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                unread,
            } = await check({
                $axios: this.app.$axios,
            });

            dispatch('increaseRequestTimeInterval');
            dispatch('setRequestTimeout');

            commit('__SET_STATE', {
                key: 'count',
                value: unread,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async requestForNotifications({
        commit,
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const params = {
                limit: state.limit,
                offset: 0,
                order: 'DESC',
                field: 'created_at',
            };

            const {
                collection,
            } = await getAll({
                $axios: this.app.$axios,
                params,
            });

            commit('__SET_STATE', {
                key: 'notifications',
                value: collection,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async markNotificationAsRead({
        dispatch,
    }, {
        id,
    }) {
        await update({
            $axios: this.app.$axios,
            id,
        });

        dispatch('checkNotificationCount', {});
        dispatch('requestForNotifications', {});
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
            dispatch('checkNotificationCount', {});
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
