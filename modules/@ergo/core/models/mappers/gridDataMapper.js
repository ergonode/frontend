/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    COLUMN_ACTIONS_ID,
    GRID_ACTIONS,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    getUUID,
} from '@Core/models/stringWrapper';

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
        .filter(key => filter[key] || filter[key] === 0);

    if (!values.length) return '';

    return values
        .map(key => `${id}${key}${filter[key]}`)
        .join(';');
}

export function getMergedFilters({
    basic, advanced,
}) {
    const merged = {
        ...basic,
        ...advanced,
    };

    return Object.keys(merged)
        .map(key => merged[key])
        .join(';');
}

export function getSortedColumnsByIDs(columns, columnsID) {
    return [
        ...columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id)),
    ];
}

export function getMappedData({
    columns, rows, hasLinks,
}) {
    const {
        length: columnsNumber,
    } = columns;
    const {
        length: rowsNumber,
    } = rows;
    const data = {};

    for (let j = 0; j < rowsNumber; j += 1) {
        for (let i = 0; i < columnsNumber; i += 1) {
            const {
                id,
            } = columns[i];

            if (!data[id]) {
                data[id] = [];
            }

            data[id].push(rows[j][id]);
        }

        if (hasLinks) {
            if (!data[COLUMN_ACTIONS_ID]) {
                data[COLUMN_ACTIONS_ID] = {};
            }

            for (let x = 0; x < GRID_ACTIONS.length; x += 1) {
                const key = GRID_ACTIONS[x];

                if (rows[j]._links.value[key]) {
                    if (!data[COLUMN_ACTIONS_ID][key]) {
                        data[COLUMN_ACTIONS_ID][key] = {};
                    }

                    if (rows[j]._links.value[key]) {
                        data[COLUMN_ACTIONS_ID][key][j] = rows[j]._links.value[key];
                    }
                }
            }
        }
    }

    const idColumn = [];

    for (let i = 0; i < rowsNumber; i += 1) {
        idColumn.push(rows[i].id ? rows[i].id.value : getUUID());
    }

    data.id = idColumn;

    return data;
}
