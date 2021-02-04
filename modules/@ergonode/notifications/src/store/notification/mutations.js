/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
        state.notifications[index].read_at = readTime;
        state.notifications = [
            ...state.notifications,
        ];
    },
    [types.UPDATE_ALL_NOTIFICATIONS_READ_TIME](state, readTime) {
        for (let i = 0; i < state.notifications.length; i += 1) {
            if (state.notifications[i].read_at === null) {
                state.notifications[i].read_at = readTime;
            }
        }

        state.notifications = [
            ...state.notifications,
        ];
    },
};
