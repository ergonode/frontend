/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_HEADER_TYPE,
    COLUMN_TYPE,
    COLUMN_WIDTH,
} from '~/defaults/grid';

const getMappedColumnHeaderType = ({ filter, type }) => {
    if (type === COLUMN_TYPE.CHECK) return GRID_HEADER_TYPE.CHECK;
    if (filter || type === COLUMN_TYPE.IMAGE) return GRID_HEADER_TYPE.INTERACTIVE;

    return GRID_HEADER_TYPE.PLAIN;
};

const getMappedColumnHeader = ({
    id,
    label,
    language = '',
    parameters,
    filter,
    type,
}) => {
    let suffix = '';
    const [code] = id.split(':');

    if (parameters) suffix = Object.keys(parameters).map((key) => parameters[key]).join(', ');

    return {
        title: label || `#${code}`,
        hint: label ? `${code} ${language}` : null,
        suffix,
        type: getMappedColumnHeaderType({ filter, type }),
    };
};

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
                const { options } = filter;

                if (Array.isArray(value)) {
                    values[rowId][columnId] = { key: value, value: value.map((key) => options[key] || 'No translation').join(', ') };
                } else if (typeof options[value] !== 'undefined') {
                    values[rowId][columnId] = { key: value, value: options[value] || 'No translation' };
                } else {
                    values[rowId][columnId] = { key: '', value: '' };
                }
            } else if (typeof value === 'undefined' || value === null) {
                values[rowId][columnId] = { value: '' };
            } else if (typeof value === 'boolean' && column.type !== COLUMN_TYPE.CHECK_CELL) {
                values[rowId][columnId] = { value: value ? 'Yes' : 'No' };
            } else {
                values[rowId][columnId] = { value };
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

export function getMappedFilters(filters) {
    const entries = Object.entries(filters);
    const { length: entriesLength } = entries;

    let mappedFilter = '';

    for (let i = 0; i < entriesLength; i += 1) {
        const [key, filter] = entries[i];

        if (filter) {
            const { value, operator } = filter;

            if (i === 0) {
                mappedFilter += `${key}`;
            } else {
                mappedFilter += `;${key}`;
            }

            mappedFilter += operator;

            if (Array.isArray(value)) {
                mappedFilter += value.join(',');
            } else {
                mappedFilter += value;
            }
        }
    }

    return mappedFilter;
}

export function getMappedAdvancedFilters(filters) {
    const mappedFilter = [];

    Object.keys(filters).forEach((id) => {
        Object.keys(filters[id]).forEach((operator) => {
            if (operator === 'isEmptyRecord') {
                mappedFilter.push(`${id}=`);
            } else {
                mappedFilter.push(`${id}${operator}${filters[id][operator]}`);
            }
        });
    });

    return mappedFilter.join(';');
}

export function getMappedElementsToGroups(elements) {
    const { length } = elements;
    const groupedElements = {};
    const unassignedElements = [];

    for (let i = 0; i < length; i += 1) {
        const element = elements[i];
        const { groups } = element;
        const { length: groupsNumber } = groups;

        if (groupsNumber) {
            for (let j = 0; j < groupsNumber; j += 1) {
                const group = groups[j];

                if (groupedElements[group]) {
                    groupedElements[group].push(element);
                } else {
                    groupedElements[group] = [];
                }
            }
        } else {
            unassignedElements.push(element);
        }
    }

    return { unassignedElements, groupedElements };
}
