/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { toCapitalize } from '~/model/stringWrapper';
import { PinnedColumnState } from '~/model/grid/layout/PinnedColumnState';
import { GridHeaderType } from '~/model/grid/layout/GridHeaderType';

const getMappedColumnHeaderTitle = ({
    id,
    type,
    label,
    language,
    parameter,
}) => {
    let suffix = '';
    const columnIDs = id.split(':');

    if (type === 'PRICE') suffix = parameter.currency;
    if (!language) return `${label} ${suffix}`;
    if (columnIDs.length > 1) return `${label || id} ${suffix}`;

    return label
        ? `${label} ${language} ${suffix}`
        : `${id} ${language} ${suffix}`;
};

const getMappedColumnHeaderType = ({ filter, type }) => {
    if (type === 'CHECK') return GridHeaderType.CHECK;
    if (filter) return GridHeaderType.INTERACTIVE;

    return GridHeaderType.PLAIN;
};

const getMappedColumnHeader = column => ({
    title: getMappedColumnHeaderTitle(column),
    type: getMappedColumnHeaderType(column),
});

export function getSortedColumnsByIDs(columns, columnsID) {
    return columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id));
}

export function getMappedColumn(column) {
    const defaultColumnWidth = 150;
    const mappedColumn = {
        ...column,
        header: getMappedColumnHeader(column),
    };
    mappedColumn.header = getMappedColumnHeader(column);

    if (mappedColumn.width) {
        mappedColumn.minWidth = mappedColumn.width;
    } else {
        mappedColumn.width = defaultColumnWidth;
        mappedColumn.minWidth = defaultColumnWidth;
    }

    return mappedColumn;
}

export function getMappedColumns(columns, isExtenderNeeded = true) {
    const mappedColumns = [];
    const pinnedColumns = [];
    const { length } = columns;
    const defaultColumnWidth = 150;
    const actionColumnWidth = 40;
    const fixedColumnsLength = isExtenderNeeded ? length + 1 : length;
    let isExtenderColumnAdded = false;

    for (let i = 0; i < fixedColumnsLength; i += 1) {
        const fixedIndex = isExtenderColumnAdded ? i - 1 : i;
        const gridColumnPosition = `${i + 1} / ${i + 2}`;
        let width = columns[fixedIndex].width || defaultColumnWidth;

        if (i === length - 1 && isExtenderNeeded) {
            mappedColumns.push({
                id: 'extender',
                label: '',
                type: '',
                editable: false,
                width: 'auto',
                minWidth: 'auto',
            });

            isExtenderColumnAdded = true;
        } else {
            if (columns[fixedIndex].type === 'ACTION') {
                width = actionColumnWidth;
            }
            mappedColumns.push({
                ...columns[fixedIndex],
                width,
                minWidth: width,
            });
        }

        mappedColumns[i].header = getMappedColumnHeader(mappedColumns[i]);

        const { id, type } = mappedColumns[i];

        if (type === 'CHECK') {
            pinnedColumns.push({
                id,
                state: PinnedColumnState.LEFT,
                position: gridColumnPosition,
            });
        }

        if (type === 'ACTION') {
            pinnedColumns.push({
                id,
                state: PinnedColumnState.RIGHT,
                position: gridColumnPosition,
            });
        }
    }

    return {
        mappedColumns,
        pinnedColumns,
    };
}

export function getMappedCellValues(columns, rows) {
    const { length: columnsNumber } = columns;
    const { length: rowsNumber } = rows;
    const values = {};

    for (let i = 0; i < columnsNumber; i += 1) {
        const column = columns[i];
        const { id: columnId, filter } = column;

        for (let j = 0; j < rowsNumber; j += 1) {
            const row = rows[j];
            const { id: rowId } = row;
            const value = row[column.id];

            if (!values[rowId]) values[rowId] = {};

            if (typeof value === 'undefined' || value === null) {
                values[rowId][columnId] = '';
            } else if (filter && filter.options) {
                const { options } = filter;

                if (Array.isArray(value)) {
                    values[rowId][columnId] = value.map(key => options[key] || 'No translation').join(', ');
                }
                if (typeof options[value] !== 'undefined') {
                    values[rowId][columnId] = options[value] || 'No translation';
                }
            } else if (typeof value === 'boolean' && column.type !== 'CHECK_CELL') {
                values[rowId][columnId] = value ? 'Yes' : 'No';
            } else {
                values[rowId][columnId] = value;
            }
        }
    }

    return values;
}

export function getMappedRowIds(rows) {
    return rows.map(row => row.id);
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

export function getMappedFilter(filter) {
    const entries = Object.entries(filter);
    const { length: entriesLength } = entries;

    let mappedFilter = '';

    for (let j = 0; j < entriesLength; j += 1) {
        const [key, value] = entries[j];
        if (value !== null) {
            if (j === 0) {
                mappedFilter += `${key}=`;
            } else {
                mappedFilter += `;${key}=`;
            }

            if (Array.isArray(value)) {
                mappedFilter += value.join(',');
            } else {
                mappedFilter += value;
            }
        }
    }

    return mappedFilter;
}
