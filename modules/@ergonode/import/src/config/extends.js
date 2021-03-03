/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
} from '@Import/config/imports';
import PRIVILEGES from '@Import/config/privileges';
import {
    getImportsStatuses,
} from '@Import/services';
import {
    ACTION_CENTER_SECTIONS,
    AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
} from '@Notifications/defaults';

export default {
    dictionaries: [
        {
            stateProp: 'sources',
            defaultValue: {},
            request: {
                path: '/dictionary/sources',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
    extendMethods: {
        '@Notifications/store/notification/action/getProcessingNotifications': async ({
            $this,
        }) => {
            const isAllowedToRead = $this.$hasAccess([
                PRIVILEGES.IMPORT.read,
            ]);

            if (!isAllowedToRead) {
                return [];
            }

            const source = $this.app.$axios.CancelToken.source();

            $this.app.$addCancelTokens(
                [
                    AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
                ],
                [
                    source,
                ],
            );

            const importStatuses = await getImportsStatuses({
                $axios: $this.app.$axios,
                cancelToken: source.token,
            });

            const successNotifications = {
                component: Components.NotificationListImportSuccessItem,
                notifications: [],
                section: ACTION_CENTER_SECTIONS.NOTIFICATIONS,
            };
            const warningNotifications = {
                component: Components.NotificationListImportWarningItem,
                notifications: [],
                section: ACTION_CENTER_SECTIONS.NOTIFICATIONS,
            };
            const processingNotifications = {
                component: Components.NotificationListImportProcessingItem,
                notifications: [],
                section: ACTION_CENTER_SECTIONS.PROCESSING,
            };

            importStatuses.forEach((notification) => {
                const {
                    status,
                } = notification;

                if (status === 'PRECESSED') {
                    processingNotifications.notifications.push({
                        ...notification,
                        createdAt: notification.started_at,
                        readAt: false,
                        message: `Importing "${notification.name}"`,
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
