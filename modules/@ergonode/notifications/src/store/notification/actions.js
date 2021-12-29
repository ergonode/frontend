/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import {
    Components,
} from '@Notifications/config/imports';
import {
    ACTION_CENTER_SECTIONS,
    MAX_NOTIFICATIONS_INTERVAL,
} from '@Notifications/defaults';
import {
    check,
    getAll,
    update,
    updateAll,
} from '@Notifications/services';

import {
    types,
} from './mutations';

export default {
    async checkUnreadNotifications({
        commit,
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

            commit('__SET_STATE', {
                key: 'unread',
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
    async getNotifications({
        commit,
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            if (state.notifications.length < state.count || !state.notifications.length) {
                const params = {
                    limit: state.limit,
                    offset: state.offset,
                    view: 'list',
                    order: 'DESC',
                    field: 'created_at',
                };

                const {
                    collection,
                    info,
                } = await getAll({
                    $axios: this.app.$axios,
                    params,
                });

                const extendedSlots = this.$getExtendSlot('@Notifications/components/NotificationList/Item');

                commit('__SET_STATE', {
                    key: 'notifications',
                    value: [
                        ...state.notifications,
                        ...collection.map(({
                            type,
                            read_at,
                            created_at,
                            object_id,
                            ...rest
                        }) => {
                            const mappedType = capitalizeAndConcatenationArray(type.split('-'));
                            let component = Components.NotificationListItem;

                            if (typeof extendedSlots[mappedType] !== 'undefined') {
                                component = extendedSlots[mappedType];
                            }

                            return {
                                ...rest,
                                readAt: read_at,
                                createdAt: created_at,
                                objectId: object_id,
                                component,
                                section: ACTION_CENTER_SECTIONS.NOTIFICATIONS,
                            };
                        }),
                    ],
                });
                commit('__SET_STATE', {
                    key: 'offset',
                    value: state.offset + state.limit,
                });
                commit('__SET_STATE', {
                    key: 'count',
                    value: info.count,
                });

                onSuccess();
            }
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getProcessingNotifications({
        commit,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const notifications = await this.$getExtendMethod('@Notifications/store/notification/action/getProcessingNotifications/__before', {
                $this: this,
            });

            commit('__SET_STATE', {
                key: 'processingNotifications',
                value: [].concat(...notifications),
            });

            await this.$getExtendMethod('@Notifications/store/notification/action/getProcessingNotifications/__after', {
                $this: this,
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

        dispatch('updateNotificationReadTime', id);
    },
    async markAllNotificationsAsRead({
        dispatch,
    }) {
        await updateAll({
            $axios: this.app.$axios,
        });

        dispatch('updateAllNotificationsReadTime');
    },
    updateNotificationReadTime({
        state,
        commit,
    }, id) {
        const index = state.notifications.findIndex(notification => notification.id === id);

        commit(types.UPDATE_NOTIFICATION_READ_TIME, {
            index,
            readTime: new Date().toISOString(),
        });
    },
    updateAllNotificationsReadTime({
        commit,
    }) {
        commit(types.UPDATE_ALL_NOTIFICATIONS_READ_TIME, new Date().toISOString());
    },
    increaseRequestTimeInterval({
        commit, state,
    }) {
        const {
            requestTimeInterval,
        } = state;

        commit('__SET_STATE', {
            key: 'requestTimeInterval',
            value: Math.min(MAX_NOTIFICATIONS_INTERVAL, requestTimeInterval * 2),
        });
    },
    setRequestTimeout({
        commit, dispatch, state,
    }) {
        dispatch('invalidateRequestTimeout');

        const timeout = setTimeout(async () => {
            await Promise.all([
                this.$getExtendMethod('@Notifications/store/notification/action/setRequestTimeout', {
                    $this: this,
                }),
                dispatch('checkUnreadNotifications', {}),
            ]);

            dispatch('increaseRequestTimeInterval');
            dispatch('setRequestTimeout');
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
