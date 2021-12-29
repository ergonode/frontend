/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
    AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
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
        '@Notifications/store/notification/action/getProcessingNotifications/__before': async ({
            $this,
        }) => {
            const isAllowedToRead = $this.$hasAccess([
                PRIVILEGES.CHANNEL.read,
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

            const exportStatuses = await getExportsStatuses({
                $axios: $this.app.$axios,
                cancelToken: source.token,
            });

            const notifications = [];

            exportStatuses.forEach((notification) => {
                const {
                    status,
                } = notification;

                if (status === 'PRECESSED') {
                    notifications.push({
                        ...notification,
                        createdAt: notification.started_at,
                        readAt: false,
                        message: `Exporting "${notification.name}"`,
                        section: ACTION_CENTER_SECTIONS.PROCESSING,
                        component: Components.NotificationListExportProcessingItem,
                    });
                }
            });

            return notifications;
        },
    },
};
