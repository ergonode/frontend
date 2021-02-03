/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';

export default () => ({
    limit: DATA_LIMIT,
    offset: 0,
    count: 0,
    unread: 0,
    notifications: [],
    requestTimeInterval: 1000,
    requestTimeout: null,
});
