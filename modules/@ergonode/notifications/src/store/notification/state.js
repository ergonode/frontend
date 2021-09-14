/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    ONE_SECOND_IN_MS,
} from '@Notifications/defaults';

export default () => ({
    limit: DATA_LIMIT,
    offset: 0,
    count: 0,
    unread: 0,
    notifications: [],
    processingNotifications: [],
    requestTimeInterval: ONE_SECOND_IN_MS,
    requestTimeout: null,
    isWaitingForDecision: false,
});
