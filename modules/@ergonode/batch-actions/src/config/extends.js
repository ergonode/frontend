/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@BatchActions/config/imports';
import {
    getBatchActionStatuses,
} from '@BatchActions/services';
import {
    ACTION_CENTER_SECTIONS,
    AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
} from '@Notifications/defaults';

export default {
    extendMethods: {
        '@Notifications/store/notification/action/getProcessingNotifications/__before': async ({
            $this,
        }) => {
            const source = $this.app.$axios.CancelToken.source();

            $this.app.$addCancelTokens(
                [
                    AXIOS_CANCEL_TOKEN_PROCESSING_NOTIFICATION_KEY,
                ],
                [
                    source,
                ],
            );

            const batchActionStatuses = await getBatchActionStatuses({
                $axios: $this.app.$axios,
                cancelToken: source.token,
            });

            const notifications = [];

            batchActionStatuses.forEach((notification) => {
                const {
                    status,
                } = notification;

                if (status === 'PRECESSED') {
                    notifications.push({
                        ...notification,
                        createdAt: notification.started_at,
                        readAt: false,
                        message: `${$this.app.i18n.t('@BatchActions.batchActionExtend.message')} "${notification.name}"`,
                        section: ACTION_CENTER_SECTIONS.PROCESSING,
                        component: Components.NotificationListBatchActionsProcessingItem,
                    });
                }
            });

            return notifications;
        },
    },
};
