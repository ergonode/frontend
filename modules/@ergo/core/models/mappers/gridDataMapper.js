/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_HEADER_TYPE,
    COLUMN_TYPE,
    COLUMN_WIDTH,
} from '@Core/defaults/grid';

export function getParsedFilters(filters) {
    const entries = Object.entries(filters);
    const { length: entriesLength } = entries;

    let mappedFilter = '';

    for (let i = 0; i < entriesLength; i += 1) {
        const [key, filter] = entries[i];

        if (filter) {
            const { value, operator } = filter;

            mappedFilter += i === 0 ? key : `;${key}`;
            mappedFilter += operator;
            mappedFilter += Array.isArray(value) ? value.join(',') : value;
        }
    }

    return mappedFilter;
}

export function getParsedAdvancedFilters(filters) {
    const mappedFilter = [];

    Object.keys(filters).forEach((id) => {
        if (filters[id] && filters[id].isEmptyRecord) {
            mappedFilter.push(`${id}=`);
        } else {
            Object.keys(filters[id]).forEach((operator) => {
                mappedFilter.push(`${id}${operator}${filters[id][operator]}`);
            });
        }
    });

    return mappedFilter.join(';');
}

export const getParsedRequestDataParams = ({
    sortedByColumn,
    currentPage,
    numberOfDisplayedElements,
    filters,
    advancedFilters,
}, columns) => {
    const parsedFilter = getParsedFilters(filters);
    const parsedAdvcFilter = getParsedAdvancedFilters(advancedFilters);

    let filter = parsedFilter;

    if (parsedFilter && parsedAdvcFilter) {
        filter += `${parsedFilter};${parsedAdvcFilter}`;
    } else if (parsedAdvcFilter) {
        filter = parsedAdvcFilter;
    }

    const params = {
        columns,
        offset: (currentPage - 1) * numberOfDisplayedElements,
        limit: numberOfDisplayedElements,
        filter,
    };

    if (Object.keys(sortedByColumn).length) {
        const { index: colSortID, orderState } = sortedByColumn;

        params.field = colSortID;
        params.order = orderState;
    }

    return params;
};

const getMappedColumnHeaderType = ({ filter, type }) => {
    if (type === COLUMN_TYPE.CHECK) return GRID_HEADER_TYPE.CHECK;
    if (filter || type === COLUMN_TYPE.IMAGE) return GRID_HEADER_TYPE.INTERACTIVE;

    return GRID_HEADER_TYPE.PLAIN;
};

export const getMappedColumnHeaderTitle = ({
    id, label, parameters, language,
}) => {
    let suffix = '';
    const [code] = id.split(':');

    if (parameters) suffix = Object.keys(parameters).map((key) => parameters[key]).join(', ');

    return {
        title: label || `#${code}`,
        hint: label ? `${code} ${language}` : null,
        suffix,
    };
};

export const getMappedColumnHeader = ({
    id,
    label,
    language = '',
    parameters,
    filter,
    type,
}) => ({
    ...getMappedColumnHeaderTitle({
        id, label, parameters, language,
    }),
    type: getMappedColumnHeaderType({ filter, type }),
});

export function getSortedColumnsByIDs(columns, columnsID) {
    return columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id));
}

export function getMappedColumn(column) {
    const mappedColumn = {
        ...column,
        header: getMappedColumnHeader(column),
    };
    const columnWidth = COLUMN_WIDTH.DEFAULT;

    return { mappedColumn, columnWidth };
}

export function getMappedColumns(columns) {
    const mappedColumns = [];
    const columnWidths = [];
    const pinnedColumns = [];
    const { length } = columns;

    for (let i = 0; i < length; i += 1) {
        const column = columns[i];

        // TODO:
        // Backend have to remove column with type CHECK
        if (column.type !== COLUMN_TYPE.CHECK) {
            columnWidths.push(COLUMN_WIDTH.DEFAULT);
            mappedColumns.push({
                ...column,
                header: getMappedColumnHeader(column),
            });
        }
    }

    return {
        mappedColumns,
        pinnedColumns,
        columnWidths,
    };
}

export function getMappedArrayValue(value, options, languageCode) {
    const parsedKey = value !== null && value.length > 0 ? value : '';

    if (Array.isArray(value)) {
        return value.map((val) => ({
            id: val,
            key: val,
            value: options[val],
            hint: options[val] ? `#${val} ${languageCode}` : '',
        }));
    }

    return {
        id: parsedKey, key: parsedKey, value: options[value] || '', hint: options[value] ? `#${parsedKey} ${languageCode}` : '',
    };
}

export function getMappedCellValues(columns, rows, rowIds) {
    const { length: columnsNumber } = columns;
    const { length: rowsNumber } = rows;
    const values = {};

    for (let i = 0; i < columnsNumber; i += 1) {
        const column = columns[i];
        const { id: columnId, filter } = column;

        for (let j = 0; j < rowsNumber; j += 1) {
            const row = rows[j];
            const rowId = rowIds[j];
            const value = row[column.id];

            if (!values[rowId]) values[rowId] = {};

            if (filter && filter.options) {
                values[rowId][columnId] = getMappedArrayValue(
                    value,
                    filter.options,
                    column.language,
                );
            } else if (typeof value === 'boolean' && column.type !== COLUMN_TYPE.CHECK_CELL) {
                values[rowId][columnId] = { value: value ? 'Yes' : 'No' };
            } else {
                values[rowId][columnId] = { value: value !== null && typeof value !== 'undefined' ? value : '' };
            }
        }
    }

    return values;
}

export function getMappedRowIds(rows) {
    const rowIds = [];
    const { length } = rows;

    for (let i = 0; i < length; i += 1) {
        const { id } = rows[i];

        if (typeof id === 'undefined') rowIds.push(i + 1);
        else rowIds.push(id);
    }

    return rowIds;
}

export function getMappedRowLinks(rows) {
    const rowLinks = [];
    const { length } = rows;

    for (let i = 0; i < length; i += 1) {
        const { id, _links } = rows[i];

        if (typeof id === 'undefined') rowLinks.push({ id: i + 1, links: _links });
        else rowLinks.push({ id, links: _links });
    }

    return rowLinks;
}
