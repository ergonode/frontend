/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@Notifications/config/imports';
import {
    ACTION_CENTER_SECTIONS,
} from '@Notifications/defaults';

export default {
    notifications: (state) => {
        const processingSection = state.processingNotifications.filter(
            notification => notification.section === ACTION_CENTER_SECTIONS.PROCESSING,
        );
        const notificationsSection = [
            ...state.processingNotifications.filter(
                notification => notification.section === ACTION_CENTER_SECTIONS.NOTIFICATIONS,
            ),
        ];

        if (state.notifications.length) {
            notificationsSection.push(
                {
                    component: Components.NotificationListItem,
                    notifications: state.notifications,
                },
            );
        }

        return {
            [ACTION_CENTER_SECTIONS.PROCESSING]: processingSection,
            [ACTION_CENTER_SECTIONS.NOTIFICATIONS]: notificationsSection,
        };
    },
};
