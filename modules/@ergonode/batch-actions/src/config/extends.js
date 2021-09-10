/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getBatchActionStatuses,
} from '@BatchActions/services';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
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
            const extendedComponents = $this.$getExtendSlot('@BatchActions/extends/notification/components/Notifications');

            batchActionStatuses.forEach((notification) => {
                const {
                    status,
                    name,
                } = notification;

                const extendedKey = capitalizeAndConcatenationArray([
                    ...name.split('_'),
                    status,
                ]);

                if (extendedComponents[extendedKey]) {
                    notifications.push({
                        ...notification,
                        createdAt: notification.started_at,
                        readAt: false,
                        message: $this.app.i18n.t('@BatchActions.batchActionExtend.message', {
                            info: notification.name,
                        }),
                        section: ACTION_CENTER_SECTIONS.PROCESSING,
                        component: extendedComponents[extendedKey],
                    });
                }
            });

            return notifications;
        },
    },
};
