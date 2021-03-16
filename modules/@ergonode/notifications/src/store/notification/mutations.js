/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    UPDATE_NOTIFICATION_READ_TIME: 'UPDATE_NOTIFICATION_READ_TIME',
    UPDATE_ALL_NOTIFICATIONS_READ_TIME: 'UPDATE_ALL_NOTIFICATIONS_READ_TIME',
};

export default {
    [types.UPDATE_NOTIFICATION_READ_TIME](state, {
        index,
        readTime,
    }) {
        state.notifications[index].readAt = readTime;
        state.notifications = [
            ...state.notifications,
        ];
    },
    [types.UPDATE_ALL_NOTIFICATIONS_READ_TIME](state, readTime) {
        for (let i = 0; i < state.notifications.length; i += 1) {
            if (state.notifications[i].readAt === null) {
                state.notifications[i].readAt = readTime;
            }
        }

        state.notifications = [
            ...state.notifications,
        ];
    },
};
