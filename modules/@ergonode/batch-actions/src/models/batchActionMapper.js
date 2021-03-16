/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getFilter({
    ids,
    excludedIds,
    query,
}) {
    let filter = {
        query,
    };

    if (ids.length || excludedIds.length) {
        filter.ids = {
            list: ids.length > 0 ? ids : excludedIds,
            included: ids.length > 0,
        };
    } else if (!query) {
        filter = 'all';
    }

    return filter;
}
