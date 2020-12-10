/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export function cellDataCompose(check) {
    return (data, draft, colId) => {
        if (draft && typeof draft[colId] !== 'undefined') {
            const draftValue = draft[colId];

            return {
                value: draftValue,
                isDraft: check(data, draftValue),
            };
        }
        return {
            value: data,
            isDraft: false,
        };
    };
}

export function getParsedFilter({
    id, filter,
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

// code_42:en_GB=264b0c7c-b571-4cf3-a91a-6edd5f2099ae     ;    esa_product_type:en_GB=VARIABLE-PRODUCT

// {
//     "code_42:en_GB":{
//         "=":[
//             "264b0c7c-b571-4cf3-a91a-6edd5f2099ae"
//         ]
//     },
//     "esa_product_type:en_GB":{
//             "=":[
//                 "VARIABLE-PRODUCT"
//             ]
//         }
// }

// code_23:en_GB>=10;code_23:en_GB<=20

// {
//     "code_23:en_GB":{
//             "isEmptyRecord":false,
//                 ">=":"10",
//                 "<=":"20"
//         }
// }

export function getParams() {

}

export function getMappedFilters(parsedFilters) {
    const operators = Object.values(FILTER_OPERATOR);
    const arrayConditions = [
        '[',
        ']',
    ];
    const filters = parsedFilters.split(';');
    const mappedFilters = {};

    filters.forEach((filter) => {
        operators.forEach((operator) => {
            if (filter.includes(operator)) {
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
                    mappedFilters[code][operator] = value.replace('[', '').replace(']', '').split(',');
                } else {
                    mappedFilters[code][operator] = value;
                }
            }
        });
    });

    console.log(mappedFilters);

    return mappedFilters;
}

export function getSortedColumnsByIDs(columns, columnsID) {
    return [
        ...columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id)),
    ];
}
