/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
        '@Notifications/store/notification/action/getProcessingNotifications/__before': async ({
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

            const notifications = [];

            importStatuses.forEach((notification) => {
                const {
                    status,
                } = notification;

                if (status === 'PRECESSED') {
                    notifications.push({
                        ...notification,
                        createdAt: notification.started_at,
                        readAt: false,
                        message: `Importing "${notification.name}"`,
                        section: ACTION_CENTER_SECTIONS.PROCESSING,
                        component: Components.NotificationListImportProcessingItem,
                    });
                }
            });

            return notifications;
        },
    },
};
