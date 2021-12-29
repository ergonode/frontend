/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import {
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';

export const getGridData = async ({
    $cookies,
    $axios,
    path,
    params,
    layout,
    onSuccess = () => {},
    onError = () => {},
}) => {
    try {
        const config = {
            params: {
                ...params,
            },
        };

        if (params.filter) {
            config.params.filter = params.filter.replace(/\[|\]/g, '');
        }

        const {
            collection,
            columns = [],
            info: {
                filtered,
            },
        } = await $axios.$get(path, config);

        const sortedColumns = getSortedColumnsByIDs(columns, params.columns);

        if ($cookies && columns.length > 0 && !$cookies.get(layout)) {
            $cookies.set(
                layout,
                sortedColumns
                    .map(({
                        id,
                    }) => id)
                    .join(','),
            );
        }

        onSuccess({
            columns: sortedColumns,
            rows: collection,
            filtered,
        });
    } catch (e) {
        if ($axios.isCancel(e)) {
            return;
        }

        onError(e);
    }
};

export const getAdvancedFiltersData = async ({
    $route,
    $cookies,
    $axios,
    path,
    params,
    onSuccess = () => {},
    onError = () => {},
}) => {
    try {
        const {
            columns,
        } = await $axios.$get(path, {
            params,
        });

        const {
            length,
        } = columns;
        const advancedFilters = [];

        for (let i = 0; i < length; i += 1) {
            const {
                id,
                element_id,
                language,
                filter,
                label,
                parameters,
            } = columns[i];

            if (filter) {
                const mappedFilter = {
                    id,
                    attributeId: element_id || '',
                    languageCode: language,
                    type: filter.type,
                    label,
                    parameters,
                };

                if (filter.options) {
                    mappedFilter.options = getMappedObjectOptions({
                        options: filter.options,
                        languageCode: language,
                    });
                }

                advancedFilters.push(mappedFilter);
            }
        }

        if (!$cookies.get(`GRID_ADV_FILTERS_CONFIG:${$route.name}`)) {
            $cookies.set(
                `GRID_ADV_FILTERS_CONFIG:${$route.name}`,
                advancedFilters
                    .map(({
                        id,
                    }) => id)
                    .join(','),
            );
        }

        onSuccess({
            advancedFilters,
        });
    } catch (e) {
        if ($axios.isCancel(e)) {
            return;
        }

        onError(e);
    }
};
