/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@Channels/config/imports';
import {
    getExportsStatuses,
} from '@Channels/services';
import {
    ACTION_CENTER_SECTIONS,
} from '@Notifications/defaults';

export default {
    dictionaries: [
        {
            stateProp: 'channels',
            defaultValue: {},
            request: {
                path: '/dictionary/channels',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
    extendMethods: {
        '@Notifications/store/notification/action/getProcessingNotifications': async ({
            $this,
        }) => {
            const exportStatuses = await getExportsStatuses({
                $axios: $this.app.$axios,
            });

            const successNotifications = {
                component: Components.NotificationListExportSuccessItem,
                notifications: [],
                section: ACTION_CENTER_SECTIONS.NOTIFICATIONS,
            };
            const warningNotifications = {
                component: Components.NotificationListExportWarningItem,
                notifications: [],
                section: ACTION_CENTER_SECTIONS.NOTIFICATIONS,
            };
            const processingNotifications = {
                component: Components.NotificationListExportProcessingItem,
                notifications: [],
                section: ACTION_CENTER_SECTIONS.PROCESSING,
            };

            exportStatuses.forEach((notification) => {
                const {
                    processed, items,
                } = notification;

                if (processed < items) {
                    processingNotifications.notifications.push({
                        ...notification,
                        createdAt: notification.started_at,
                        readAt: false,
                        message: `Exporting "${notification.name}"`,
                    });
                }
            });

            return [
                successNotifications,
                warningNotifications,
                processingNotifications,
            ].filter(({
                notifications,
            }) => notifications.length > 0);
        },
    },
};
