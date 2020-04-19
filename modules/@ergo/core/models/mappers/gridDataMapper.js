/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    COLUMN_ACTIONS_ID,
} from '@Core/defaults/grid';
import { getUUID } from '@Core/models/stringWrapper';

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

export function getParsedFilters(filters, advancedFilters = []) {
    const entries = Object.entries(filters);
    const { length: entriesLength } = entries;

    let mappedFilter = '';

    for (let i = 0; i < entriesLength; i += 1) {
        const [key, filter] = entries[i];

        if (filter) {
            const { value, operator } = filter;
            const advancedFilter = advancedFilters
                .find(advFilter => advFilter.id === key
                    && Object.keys(advFilter.value).length > 1);

            if (!advancedFilter) {
                mappedFilter += i === 0 ? key : `;${key}`;
                mappedFilter += operator;
                mappedFilter += Array.isArray(value) ? value.join(',') : value;
            }
        }
    }

    return mappedFilter;
}

export function getParsedAdvancedFilters(filters) {
    const mappedFilter = [];

    filters.forEach((filter) => {
        if (!filter.isGhost) {
            if (filter.value.isEmptyRecord) {
                mappedFilter.push(`${filter.id}=`);
            } else {
                Object.keys(filter.value).forEach((key) => {
                    if (key !== 'isEmptyRecord') {
                        mappedFilter.push(`${filter.id}${key}${filter.value[key]}`);
                    }
                });
            }
        }
    });

    return mappedFilter.join(';');
}

export function getSortedColumnsByIDs(columns, columnsID) {
    return [...columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id))];
}

export function getMappedData(columns, collection) {
    const hasAnyActionLink = collection.some(element => typeof element._links !== 'undefined');
    const { length: columnsNumber } = columns;
    const { length: rowsNumber } = collection;
    const data = {};

    for (let j = 0; j < rowsNumber; j += 1) {
        for (let i = 0; i < columnsNumber; i += 1) {
            const { id } = columns[i];

            if (!data[id]) {
                data[id] = [];
            }

            data[id].push(collection[j][id]);
        }

        if (hasAnyActionLink && collection[j]._links) {
            const linkKeys = Object.keys(collection[j]._links.value);

            if (!data[COLUMN_ACTIONS_ID]) {
                data[COLUMN_ACTIONS_ID] = {};
            }

            linkKeys.forEach((key) => {
                if (!data[COLUMN_ACTIONS_ID][key]) {
                    data[COLUMN_ACTIONS_ID][key] = {};
                }

                data[COLUMN_ACTIONS_ID][key][j] = collection[j]._links.value[key];
            });
        }
    }

    const idColumn = [];

    for (let i = 0; i < rowsNumber; i += 1) {
        idColumn.push(collection[i].id ? collection[i].id.value : getUUID());
    }

    data.id = idColumn;

    return data;
}
