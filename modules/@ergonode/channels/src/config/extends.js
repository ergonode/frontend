/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@Channels/config/imports';
import PRIVILEGES from '@Channels/config/privileges';
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
            let exportStatuses = [];
            const isAllowedToRead = $this.$hasAccess([
                PRIVILEGES.CHANNEL.read,
            ]);

            if (isAllowedToRead) {
                exportStatuses = await getExportsStatuses({
                    $axios: $this.app.$axios,
                });
            }

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
                    status,
                } = notification;

                if (status === 'PRECESSED') {
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
