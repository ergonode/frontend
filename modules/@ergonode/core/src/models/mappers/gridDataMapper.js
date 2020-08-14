/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export function cellDataCompose(check) {
    return (data, draft, colId) => {
        if (draft && typeof draft[colId] !== 'undefined') {
            const draftValue = draft[colId];

            return {
                value: draftValue,
                isDraft: check(data, draftValue),
            };
        }
        return {
            value: data,
            isDraft: false,
        };
    };
}

export function getParsedFilter({
    id, filter,
}) {
    if (filter.isEmptyRecord) {
        return `${id}${FILTER_OPERATOR.EQUAL}`;
    }

    const values = Object
        .keys(filter)
        .filter(key => (Array.isArray(filter[key])
                && filter[key].length > 0)
            || (!Array.isArray(filter[key])
                && (filter[key] || filter[key] === 0)));

    if (!values.length) return '';

    return values
        .map(key => `${id}${key}${filter[key]}`)
        .join(';');
}

export function getMergedFilters({
    basic, advanced,
}) {
    return [
        ...Object
            .keys(basic)
            .map(key => getParsedFilter({
                id: key,
                filter: basic[key],
            })),
        ...Object
            .keys(advanced)
            .map(key => getParsedFilter({
                id: key,
                filter: advanced[key],
            })),
    ].join(';');
}

export function getSortedColumnsByIDs(columns, columnsID) {
    return [
        ...columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id)),
    ];
}
