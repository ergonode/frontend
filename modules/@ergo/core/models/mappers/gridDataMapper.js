/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_HEADER_TYPE,
    COLUMN_TYPE,
    COLUMN_WIDTH,
} from '@Core/defaults/grid';

export function getParsedFilters(filters, advcFilters = null) {
    const entries = Object.entries(filters);
    const { length: entriesLength } = entries;

    let mappedFilter = '';

    for (let i = 0; i < entriesLength; i += 1) {
        const [key, filter] = entries[i];

        if (filter && (advcFilters === null || typeof advcFilters[key] === 'undefined')) {
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
    sortedColumn,
    currentPage,
    numberOfDisplayedElements,
    filters,
    advancedFilters,
}, columns) => {
    const parsedFilter = getParsedFilters(filters, advancedFilters);
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
        extended: true,
        filter,
    };

    if (Object.keys(sortedColumn).length) {
        const { index: colSortID, orderState } = sortedColumn;

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
    const mappedColumnsId = [];
    const columnWidths = [];
    const pinnedColumns = [];
    const { length } = columns;

    for (let i = 0; i < length; i += 1) {
        const column = columns[i];

        if (column.visible && column.type !== 'CHECK') {
            columnWidths.push(COLUMN_WIDTH.DEFAULT);
            mappedColumns.push({
                ...column,
                header: getMappedColumnHeader(column),
            });
            mappedColumnsId.push(column.id);
        }
    }

    return {
        mappedColumnsId,
        mappedColumns,
        pinnedColumns,
        columnWidths,
    };
}

export function getMappedGridColumnOptions(value, options, languageCode) {
    if (Array.isArray(value)) {
        const { length } = value;
        const editValue = [];
        let presentationValue = '';

        for (let i = 0; i < length; i += 1) {
            const val = value[i];

            presentationValue += options[val] || `#${val}`;

            if (i + 1 < length) {
                presentationValue += ', ';
            }

            editValue.push({
                id: val,
                key: val,
                value: options[val],
                hint: options[val] ? `#${val} ${languageCode}` : '',
            });
        }

        return {
            presentationValue,
            editValue,
        };
    }

    let presentationValue = '';

    if (value !== null && value.length) {
        presentationValue = options[value] || `#${value}`;
    }

    return {
        presentationValue,
        editValue: {
            id: value, key: value, value: options[value] || '', hint: options[value] ? `#${value} ${languageCode}` : '',
        },
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
            const { value, prefix = '', suffix = '' } = row[column.id];

            if (!values[rowId]) values[rowId] = {};
            if (filter && filter.options) {
                const { presentationValue, editValue } = getMappedGridColumnOptions(
                    value,
                    filter.options,
                    column.language,
                );

                values[rowId][columnId] = {
                    presentationValue, editValue, prefix, suffix,
                };
            } else if (typeof value === 'boolean') {
                values[rowId][columnId] = {
                    presentationValue: value ? 'Yes' : 'No', editValue: value, prefix, suffix,
                };
            } else {
                const parsedValue = value === null || typeof value === 'undefined' ? '' : value;

                values[rowId][columnId] = {
                    presentationValue: parsedValue, editValue: parsedValue, prefix, suffix,
                };
            }
        }
    }

    return values;
}

export function getMappedRows(rows) {
    const rowIds = [];
    const rowLinks = [];
    const { length } = rows;

    for (let i = 0; i < length; i += 1) {
        const { id, _links } = rows[i];

        if (typeof id !== 'object') {
            const index = i + 1;
            rowIds.push(index);
            rowLinks.push({ id: index, links: _links });
        } else {
            rowIds.push(id.value);
            rowLinks.push({ id: id.value, links: _links });
        }
    }

    return { rowIds, rowLinks };
}
