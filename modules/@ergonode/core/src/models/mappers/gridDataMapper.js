/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DATA_LIMIT,
    DEFAULT_PAGE,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export function getParsedFilter({
    id,
    filter,
}) {
    if (filter.isEmptyRecord) {
        return `${id}${FILTER_OPERATOR.EQUAL}`;
    }

    const values = Object
        .keys(filter)
        .filter(key => (Array.isArray(filter[key])
                && filter[key].length > 0)
            || (!Array.isArray(filter[key])
                && (filter[key] || filter[key] === 0)));

    if (!values.length) return '';

    return values
        .map((key) => {
            if (Array.isArray(filter[key])) {
                return `${id}${key}[${filter[key]}]`;
            }

            return `${id}${key}${filter[key]}`;
        })
        .join(';');
}

export function getParsedFiltersList(filters) {
    const parsedFilters = [];
    const filterKeys = Object.keys(filters);

    filterKeys.forEach((key) => {
        const [
            code,
            language,
        ] = key.split(':');
        const operators = Object.keys(filters[key]);

        operators.forEach((operator) => {
            const isArray = Array.isArray(filters[key][operator]);
            const value = isArray
                ? filters[key][operator].join(',')
                : filters[key][operator];

            if ((isArray && value.length > 0)
                || (!isArray
                    && (value || value === 0))) {
                const parsedFilter = {
                    column: code,
                    operator,
                    value,
                };

                if (language) {
                    parsedFilter.language = language;
                }

                parsedFilters.push(parsedFilter);
            }
        });
    });

    return parsedFilters;
}

export function getParsedFilters(filters) {
    return Object
        .keys(filters)
        .map(key => getParsedFilter({
            id: key,
            filter: filters[key],
        }))
        .join(';');
}

export function getDraftsBasedOnCellValues(cellValues) {
    return cellValues.reduce((prev, {
        rowId,
        columnId,
        value,
    }) => ({
        ...prev,
        [`${rowId}/${columnId}`]: value,
    }), {});
}

export function getFilterQueryParams({
    filter = '',
    advancedFilter = '',
}) {
    const filters = [];

    if (advancedFilter) {
        filters.push(advancedFilter);
    }

    if (filter) {
        filters.push(filter);
    }

    return filters.join(';');
}

export function getParams({
    $route,
    $cookies,
    layout,
    defaultColumns = '',
}) {
    const {
        query: {
            page = DEFAULT_PAGE,
            itemsPerPage = DATA_LIMIT,
            field = '',
            order = '',
        },
    } = $route;

    const params = {
        offset: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
        extended: true,
        columns: $cookies.get(layout) || defaultColumns,
    };

    const mappedFilter = getFilterQueryParams($route.query);

    if (mappedFilter) {
        params.filter = mappedFilter;
    }

    if (field) {
        params.field = field;
    }

    if (order) {
        params.order = order;
    }

    return params;
}

export function getMappedFilters(queryFilters) {
    if (!queryFilters) {
        return {};
    }

    const operators = Object.values(FILTER_OPERATOR);
    const arrayConditions = [
        '[',
        ']',
    ];
    const filters = queryFilters.split(';');
    const mappedFilters = {};

    filters.forEach((filter) => {
        operators.forEach((operator) => {
            if (((operator === '=' && !filter.includes('>=') && !filter.includes('<=')) || operator !== '=') && filter.includes(operator)) {
                const [
                    code,
                    value,
                ] = filter.split(operator);

                if (typeof mappedFilters[code] === 'undefined') {
                    mappedFilters[code] = {};
                }

                if (value === '') {
                    mappedFilters[code].isEmptyRecord = true;
                } else if (arrayConditions.every(condition => value.includes(condition))) {
                    mappedFilters[code][operator] = value.replace(/\[|\]/g, '').split(',');
                } else {
                    mappedFilters[code][operator] = value;
                }
            }
        });
    });

    return mappedFilters;
}

export function getSortedColumnsByIDs(columns, columnIds) {
    if (!columnIds) {
        return columns;
    }

    return [
        ...columns.sort((a, b) => columnIds.indexOf(a.id) - columnIds.indexOf(b.id)),
    ];
}

export function getDefaultDataFromQueryParams($route) {
    const {
        query: {
            page,
            itemsPerPage,
            filter,
            advancedFilter,
            field,
            order,
        },
    } = $route;

    return {
        filterValues: getMappedFilters(filter || ''),
        advancedFilterValues: getMappedFilters(advancedFilter || ''),
        pagination: {
            page: +page || DEFAULT_PAGE,
            itemsPerPage: +itemsPerPage || DATA_LIMIT,
        },
        sortOrder: {
            field: field || '',
            order: order || '',
        },
    };
}
