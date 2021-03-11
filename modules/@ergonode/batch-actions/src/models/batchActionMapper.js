/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function paramsSerializer(paramsToSerialize) {
    if (!paramsToSerialize.ids && !paramsToSerialize.query) {
        return 'filter=all';
    }

    const {
        ids: {
            list = [],
            included = false,
        },
        query,
    } = paramsToSerialize;

    const filters = [];

    if (query) {

        filters.push(`query=${query}`);
    }

    list.forEach((id) => {
        filters.push(`filter[ids][list][]=${id}`);
    });

    filters.push(`filter[ids][included]=${included}`);

    return filters.join('&');
}

export function getFilter({
    ids,
    excludedIds,
    query,
}) {
    const filter = {
        query,
    };

    if (ids.length || excludedIds.length) {
        filter.ids = {
            list: ids.length > 0 ? ids : excludedIds,
            included: ids.length > 0,
        };
    }

    return filter;
}
