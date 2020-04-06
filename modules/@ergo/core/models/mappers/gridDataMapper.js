/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_HEADER_TYPE,
    COLUMN_TYPE,
    COLUMN_ACTIONS_ID,
} from '@Core/defaults/grid';

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

const getMappedColumnHeaderType = ({ filter, type }) => {
    if (type === COLUMN_TYPE.CHECK) return GRID_HEADER_TYPE.CHECK;
    if (filter || type === COLUMN_TYPE.IMAGE) return GRID_HEADER_TYPE.INTERACTIVE;

    return GRID_HEADER_TYPE.PLAIN;
};

export const getMappedColumnHeaderTitle = ({
    id, label, parameters,
}) => {
    let suffix = '';
    const [code, language = ''] = id.split(':');

    if (parameters) suffix = Object.keys(parameters).map(key => parameters[key]).join(', ');

    return {
        title: label || `#${code}`,
        hint: label ? `${code} ${language}` : null,
        suffix,
    };
};

export const getMappedColumnHeader = ({
    id,
    label,
    parameters,
    filter,
    type,
}) => ({
    ...getMappedColumnHeaderTitle({
        id, label, parameters,
    }),
    type: getMappedColumnHeaderType({ filter, type }),
});

export function getSortedColumnsByIDs(columns, columnsID) {
    return columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id));
}

export function getMappedColumns(columns) {
    const mappedColumns = [];
    const { length } = columns;

    for (let i = 0; i < length; i += 1) {
        const column = columns[i];

        mappedColumns.push({
            ...column,
            header: getMappedColumnHeader(column),
        });
    }

    return mappedColumns;
}

export function getMappedData(columns, collection) {
    const { length: columnsNumber } = columns;
    const { length: rowsNumber } = collection;
    const data = {};

    for (let i = 0; i < columnsNumber; i += 1) {
        const { id } = columns[i];
        const columnData = [];

        for (let j = 0; j < rowsNumber; j += 1) {
            columnData.push(collection[j][id]);
        }

        data[id] = columnData;
    }

    const hasAnyActionLink = collection.some(element => typeof element._links !== 'undefined');

    if (hasAnyActionLink) {
        const actionColumn = [];

        for (let i = 0; i < rowsNumber; i += 1) {
            actionColumn.push(collection[i]._links.value);
        }

        data[COLUMN_ACTIONS_ID] = actionColumn;
    }

    return data;
}
