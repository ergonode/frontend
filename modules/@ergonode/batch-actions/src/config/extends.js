/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getAll,
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

            const batchActions = await getAll({
                $axios: $this.app.$axios,
                cancelToken: source.token,
            });

            const notifications = [];
            const extendedComponents = $this.$getExtendSlot('@BatchActions/extends/notification/components/Notifications');

            batchActions.forEach((batchAction) => {
                const {
                    status,
                    name,
                } = batchAction;

                const extendedKey = capitalizeAndConcatenationArray([
                    ...name.split('_'),
                    ...status.split('_'),
                ]);

                if (extendedComponents[extendedKey]) {
                    notifications.push({
                        ...batchAction,
                        createdAt: batchAction.started_at,
                        readAt: false,
                        message: $this.app.i18n.t('@BatchActions.batchActionExtend.message', {
                            info: batchAction.name,
                        }),
                        section: ACTION_CENTER_SECTIONS.PROCESSING,
                        component: extendedComponents[extendedKey],
                    });
                }
            });

            return notifications;
        },
        '@Notifications/store/notification/action/setRequestTimeout': async ({
            $this,
        }) => {
            const batchActions = await getAll({
                $axios: $this.app.$axios,
            });

            $this.app.store.dispatch('notification/__setState', {
                key: 'isWaitingForDecision',
                value: batchActions.some(batchAction => batchAction.status === 'WAITING_FOR_DECISION'),
            });
        },
    },
};
