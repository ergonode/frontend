/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { toCapitalize } from '~/model/stringWrapper';
import { PinnedColumnState } from '~/model/grid/layout/PinnedColumnState';

export function getSortedColumnsByIDs(columns, columnsID) {
    return columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id));
}

export function getMappedColumns(columns) {
    const mappedColumns = [];
    const pinnedColumns = [];
    const { length } = columns;
    const defaultColumnWidth = 150;
    const actionColumnWidth = 40;
    const fixedColumnsLength = length + 1;
    let isExtenderColumnAdded = false;

    for (let i = 0; i < fixedColumnsLength; i += 1) {
        const fixedIndex = isExtenderColumnAdded ? i - 1 : i;
        const gridColumnPosition = `${i + 1} / ${i + 2}`;
        let width = columns[fixedIndex].width || defaultColumnWidth;

        if (i === length - 1) {
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
