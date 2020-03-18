/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_HEADER_TYPE,
    COLUMN_TYPE,
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
    const mappedColumnsId = [];
    const { length } = columns;

    for (let i = 0; i < length; i += 1) {
        const column = columns[i];

        if (column.visible && column.type !== 'CHECK') {
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
