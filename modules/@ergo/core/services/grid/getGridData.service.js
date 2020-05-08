/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedData,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import { getMappedObjectOptions } from '@Core/models/mappers/translationsMapper';

export const getGridData = ({ $axios, path, params }) => $axios
    .$get(path, { params })
    .then(({
        collection,
        columns,
        info: { count, filtered },
    }) => {
        const visibleColumns = columns.filter(({ visible }) => visible);
        const sortedColumns = params.columns
            ? getSortedColumnsByIDs(visibleColumns, params.columns)
            : visibleColumns;
        const mappedData = getMappedData({
            columns: visibleColumns,
            rows: collection,
            hasLinks: columns.findIndex(({ id }) => id === '_links') !== -1,
        });

        return {
            columns: sortedColumns,
            data: mappedData,
            count,
            filtered,
        };
    });

export const getAdvancedFiltersData = ({ $axios, path, params }) => $axios
    .$get(path, { params })
    .then(({
        columns,
    }) => {
        const { length } = columns;
        const advancedFilters = [];

        for (let i = 0; i < length; i += 1) {
            const filter = {
                id: columns[i].id,
                attributeId: columns[i].element_id || '',
                languageCode: columns[i].language,
                type: columns[i].filter.type,
                label: columns[i].label,
                parameters: columns[i].parameters,
                isGhost: false,
                value: {
                    isEmptyRecord: false,
                },
            };

            if (columns[i].filter && columns[i].filter.options) {
                filter.option = getMappedObjectOptions({
                    options: columns[i].filter.options,
                    languageCode: columns[i].language,
                });
            }

            advancedFilters.push(filter);
        }

        return advancedFilters;
    });
