/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { toCapitalize } from '~/model/stringWrapper';
import {
    PINNED_COLUMN_STATE,
    GRID_HEADER_TYPE,
    COLUMN_TYPE,
    COLUMN_WIDTH,
} from '~/defaults/grid/main';

const getMappedColumnHeaderTitle = ({
    id,
    type,
    label,
    language,
    parameter,
}) => {
    let suffix = '';
    const columnIDs = id.split(':');

    if (type === COLUMN_TYPE.PRICE) suffix = parameter.currency;
    if (!language) return `${label} ${suffix}`;
    if (columnIDs.length > 1) return `${label || id} ${suffix}`;

    return label
        ? `${label} ${language} ${suffix}`
        : `${id} ${language} ${suffix}`;
};

const getMappedColumnHeaderType = ({ filter, type }) => {
    if (type === COLUMN_TYPE.CHECK) return GRID_HEADER_TYPE.CHECK;
    if (filter || type === COLUMN_TYPE.IMAGE) return GRID_HEADER_TYPE.INTERACTIVE;

    return GRID_HEADER_TYPE.PLAIN;
};

const getMappedColumnHeader = (column) => ({
    title: getMappedColumnHeaderTitle(column),
    type: getMappedColumnHeaderType(column),
});

const getMappedColumnWidth = (column) => {
    const isSelectKind = column.filter
        && (column.filter.type === COLUMN_TYPE.SELECT
            || column.filter.type === COLUMN_TYPE.MULTI_SELECT);
    const isActionKind = column.type === COLUMN_TYPE.ACTION || column.type === COLUMN_TYPE.CHECK;
    if (isSelectKind) return COLUMN_WIDTH.SELECT;
    if (isActionKind) return COLUMN_WIDTH.ACTION;
    return COLUMN_WIDTH.DEFAULT;
};

export function getSortedColumnsByIDs(columns, columnsID) {
    return columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id));
}

export function getMappedColumn(column) {
    const mappedColumn = {
        ...column,
        header: getMappedColumnHeader(column),
    };
    const columnWidth = getMappedColumnWidth(column);

    return { mappedColumn, columnWidth };
}

export function getMappedColumns(columns) {
    const mappedColumns = [];
    const columnWidths = [];
    const pinnedColumns = [];
    const { length } = columns;

    for (let i = 0; i < length; i += 1) {
        const gridColumnPosition = `${i + 1} / ${i + 2}`;
        const column = columns[i];

        columnWidths.push(getMappedColumnWidth(column));
        mappedColumns.push({
            ...column,
            header: getMappedColumnHeader(column),
        });

        if (column.type === COLUMN_TYPE.CHECK) {
            pinnedColumns.push({
                id: column.id,
                state: PINNED_COLUMN_STATE.LEFT,
                position: gridColumnPosition,
            });
        }
        //
        // if (type === COLUMN_TYPE.ACTION) {
        //     pinnedColumns.push({
        //         id,
        //         state: PINNED_COLUMN_STATE.RIGHT,
        //         position: gridColumnPosition,
        //     });
        // }
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

export function getMappedGridConfiguration(configuration) {
    const mappedConfiguration = {};
    const configurationKeys = Object.keys(configuration);
    const configurationValues = Object.values(configuration);
    const { length } = configurationKeys;

    for (let i = 0; i < length; i += 1) {
        const splittedKeys = configurationKeys[i].split('_');
        const { length: splittedKeysLength } = splittedKeys;
        if (splittedKeysLength > 0) {
            const capitalizedFirstLetterKey = toCapitalize(
                splittedKeys[splittedKeysLength - 1],
            );

            mappedConfiguration[`isColumn${capitalizedFirstLetterKey}able`] = configurationValues[i];
        }
    }

    return mappedConfiguration;
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
    let mappedFilter = '';

    Object.keys(filters).forEach((id, index) => {
        Object.keys(filters[id]).forEach((operator) => {
            if (index === 0) {
                mappedFilter += `${id}`;
            } else {
                mappedFilter += `;${id}`;
            }

            mappedFilter += `${operator}${filters[id][operator]}`;
        });
    });

    return mappedFilter;
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
