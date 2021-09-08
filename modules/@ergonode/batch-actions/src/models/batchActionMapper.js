/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getFilter({
    ids,
    excludedIds,
    query,
}) {
    let filter = {};

    if (ids.length || excludedIds.length) {
        const isIncluded = ids.length > 0;

        filter.ids = {
            list: ids,
            included: isIncluded,
        };

        if (!isIncluded) {
            filter.ids.list = excludedIds;
            filter.query = query;
        }
    } else if (!query) {
        filter = 'all';
    } else {
        filter.query = query;
    }

    return filter;
}
