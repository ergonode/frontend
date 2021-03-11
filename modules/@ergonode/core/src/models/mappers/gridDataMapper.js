/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
    }) => {
        const tmp = prev;
        tmp[`${rowId}/${columnId}`] = value;
        return tmp;
    }, {});
}

export function getFilterQueryParams({
    filter = '',
    advancedFilter = '',

}) {
    let mappedFilter = '';

    if (advancedFilter) {
        mappedFilter = advancedFilter;
    }

    if (filter) {
        if (mappedFilter) {
            mappedFilter += filter;
        } else {
            mappedFilter = filter;
        }
    }

    return mappedFilter;
}

export function getParams({
    $route,
    $cookies,
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
        columns: $cookies.get(`GRID_CONFIG:${$route.name}`) || defaultColumns,
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

export function getMappedFilters(parsedFilters) {
    if (!parsedFilters) {
        return {};
    }

    const operators = Object.values(FILTER_OPERATOR);
    const arrayConditions = [
        '[',
        ']',
    ];
    const filters = parsedFilters.split(';');
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
