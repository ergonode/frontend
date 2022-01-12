/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    MIN_NOTIFICATIONS_INTERVAL,
} from '@Notifications/defaults';

export default () => ({
    limit: DATA_LIMIT,
    offset: 0,
    count: 0,
    unread: 0,
    notifications: [],
    processingNotifications: [],
    requestTimeInterval: MIN_NOTIFICATIONS_INTERVAL,
    requestTimeout: null,
    isWaitingForDecision: false,
});
