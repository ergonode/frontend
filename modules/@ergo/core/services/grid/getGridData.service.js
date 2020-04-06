/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedData,
    getMappedColumns,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';

export const getGridData = ($axios, path, params) => $axios
    .$get(path, { params })
    .then(({
        collection,
        columns,
        info: { count, filtered },
    }) => {
        const sortedColumns = params.columns
            ? getSortedColumnsByIDs(columns, params.columns, 'id')
            : columns;
        const mappedColumns = getMappedColumns(sortedColumns);
        const mappedData = getMappedData(columns, collection);

        return {
            columns: mappedColumns,
            data: mappedData,
            count,
            filtered,
        };
    });

export const getAdvancedFiltersData = ($axios, path, params) => $axios
    .$get(path, { params })
    .then(({
        columns,
    }) => {
        const { length } = columns;
        const advancedFilters = [];

        for (let i = 0; i < length; i += 1) {
            const options = columns[i].filter && columns[i].filter.options
                ? Object.keys(columns[i].filter.options)
                    .map(key => ({
                        key,
                        value: columns[i].filter.options[key],
                    }))
                : [];

            advancedFilters.push({
                id: columns[i].id,
                attributeId: columns[i].element_id || '',
                languageCode: columns[i].language,
                type: columns[i].filter.type,
                label: columns[i].label,
                parameters: columns[i].parameters,
                options,
                isGhost: false,
                value: {
                    isEmptyRecord: false,
                },
            });
        }

        return advancedFilters;
    });
