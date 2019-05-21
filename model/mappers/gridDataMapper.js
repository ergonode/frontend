/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { toCapitalize } from '~/model/stringOperations';

// From whole rows in grid we have to find only those from whose we did fetch draft value
const getRowsBasedOnDrafts = ({ drafts, rows }) => {
    const rowsBasedOnDrafts = [];

    Object.keys(drafts).forEach((key) => {
        const rowByDraftId = rows.find(row => row.id === key);
        if (rowByDraftId) {
            rowsBasedOnDrafts.push(rowByDraftId);
        }
    });

    return rowsBasedOnDrafts;
};

const isDraftValueEqualRowValue = (
    { drafts, rows, draftValue },
) => {
    const draftRows = getRowsBasedOnDrafts({ drafts, rows });

    return Object.keys(draftValue).some(
        draftKey => draftRows.some(row => row[draftKey] === draftValue[draftKey]),
    );
};

export function areAnyDraftsInGrid({ drafts, rows }) {
    const draftsEntries = Object.entries(drafts);

    return draftsEntries.some((
        [, draftValue],
    ) => !isDraftValueEqualRowValue({ drafts, rows, draftValue }));
}

export function insertExtendingColumn(columns) {
    const { length } = columns;
    return [
        ...columns.slice(0, length - 1),
        {
            id: 'extender',
            label: '',
            type: '',
            editable: false,
            width: 'auto',
        },
        ...columns.slice(length - 1),
    ];
}

export function getMappedColumnWidth({ width }) {
    return width
        ? `minmax(max-content, ${width}px)`
        : 'minmax(auto, 200px)';
}

export function getSortedColumnsByIDs(columns, columnsID) {
    return columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id));
}

export function getMappedColumns(columns) {
    const unchangedColumns = columns;
    const { length } = unchangedColumns;
    let actionColumnIndex = length - 1;

    for (let i = 0; i < length; i += 1) {
        unchangedColumns[i].width = getMappedColumnWidth(unchangedColumns[i]);
        if (unchangedColumns[i].type === 'CHECK') {
            unchangedColumns[i].isLeftPinned = true;
        }

        if (unchangedColumns[i].type === 'ACTION') {
            unchangedColumns[i].isRightPinned = true;
            actionColumnIndex = i;
        }
    }
    if (actionColumnIndex !== length - 1) {
        unchangedColumns.push(unchangedColumns.splice(actionColumnIndex, 1)[0]);
    }

    return insertExtendingColumn(unchangedColumns);
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
