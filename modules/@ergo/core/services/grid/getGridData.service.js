/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getMappedData,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import {
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';

export const getGridData = ({
    $axios, path, params,
}) => $axios
    .$get(path, {
        params,
    })
    .then(({
        collection,
        columns,
        info: {
            filtered,
        },
    }) => {
        const visibleColumns = columns.filter(({
            visible,
        }) => visible);
        const sortedColumns = params.columns
            ? getSortedColumnsByIDs(visibleColumns, params.columns)
            : visibleColumns;
        const mappedData = getMappedData({
            columns: visibleColumns,
            rows: collection,
            hasLinks: columns.findIndex(({
                id,
            }) => id === '_links') !== -1,
        });

        return {
            columns: sortedColumns,
            data: mappedData,
            filtered,
        };
    });

export const getAdvancedFiltersData = ({
    $axios, $store, $addAlert, path, params,
}) => $axios
    .$get(path, {
        params,
    })
    .then(({
        columns,
    }) => {
        const {
            length,
        } = columns;
        const advancedFilters = [];
        const {
            units,
        } = $store.state.dictionaries;

        for (let i = 0; i < length; i += 1) {
            const {
                id, element_id, language, filter, label, parameters,
            } = columns[i];

            if (filter) {
                let mappedParameters = '';

                if (parameters) {
                    if (parameters.unit) {
                        mappedParameters = units.find(unit => unit.id === parameters.unit).symbol;
                    } else {
                        mappedParameters = Object.values(parameters).join(', ');
                    }
                }

                const mappedFilter = {
                    id,
                    attributeId: element_id || '',
                    languageCode: language,
                    type: filter.type,
                    label,
                    parameters: mappedParameters,
                    value: {
                        isEmptyRecord: false,
                    },
                };

                if (filter.options) {
                    mappedFilter.options = getMappedObjectOptions({
                        options: filter.options,
                        languageCode: language,
                    });
                }

                advancedFilters.push(mappedFilter);
            } else {
                $addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Attribute has no filter',
                });
            }
        }

        return advancedFilters;
    });
