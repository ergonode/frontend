/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    getDefaultDataFromQueryParams,
    getDraftsBasedOnCellValues,
    getFilterQueryParams,
    getMappedFilters,
    getParams,
    getParsedFilter,
    getParsedFilters,
    getParsedFiltersList,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';

describe('gridDataMapper/getParsedFilter', () => {
    describe('Validate filter value', () => {
        it('Is empty record', () => {
            const id = 1;
            const filter = {
                isEmptyRecord: true,
                [FILTER_OPERATOR.EQUAL]: 'Test',
            };
            const result = `${id}${FILTER_OPERATOR.EQUAL}`;

            expect(getParsedFilter({
                id,
                filter,
            })).toStrictEqual(result);
        });

        it('Has primitive value', () => {
            const id = 1;
            const filter = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.EQUAL]: 'Test',
            };
            const result = `${id}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getParsedFilter({
                id,
                filter,
            })).toStrictEqual(result);
        });

        it('Has primitive non value', () => {
            const id = 1;
            const filter = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.EQUAL]: '',
            };
            const result = '';

            expect(getParsedFilter({
                id,
                filter,
            })).toStrictEqual(result);
        });

        it('Has array value', () => {
            const id = 1;
            const filter = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.EQUAL]: [
                    1,
                    2,
                    3,
                ],
            };
            const result = `${id}${FILTER_OPERATOR.EQUAL}[1,2,3]`;

            expect(getParsedFilter({
                id,
                filter,
            })).toStrictEqual(result);
        });

        it('Has array non value', () => {
            const id = 1;
            const filter = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.EQUAL]: [],
            };
            const result = '';

            expect(getParsedFilter({
                id,
                filter,
            })).toStrictEqual(result);
        });

        it('Has range value', () => {
            const id = 1;
            const filter = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: 1,
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: 3,
            };
            const result = `${id}${FILTER_OPERATOR.GREATER_OR_EQUAL}1;${id}${FILTER_OPERATOR.SMALLER_OR_EQUAL}3`;

            expect(getParsedFilter({
                id,
                filter,
            })).toStrictEqual(result);
        });
    });
});

describe('gridDataMapper/getParsedFilters', () => {
    describe('Validate merged basic with advanced filters', () => {
        it('Only basic filters', () => {
            const filterId = 123;
            const basic = {
                [filterId]: {
                    [FILTER_OPERATOR.EQUAL]: 'Test',
                },
            };
            const advanced = {};
            const result = `${filterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getParsedFilters({
                ...basic,
                ...advanced,
            })).toStrictEqual(result);
        });

        it('Only advanced filters', () => {
            const filterId = 123;
            const advanced = {
                [filterId]: {
                    [FILTER_OPERATOR.EQUAL]: 'Test',
                },
            };
            const basic = {};
            const result = `${filterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getParsedFilters({
                ...basic,
                ...advanced,
            })).toStrictEqual(result);
        });

        it('Unique filters', () => {
            const filterId = 123;
            const advFilterId = 456;
            const advanced = {
                [advFilterId]: {
                    [FILTER_OPERATOR.EQUAL]: 'Test',
                },
            };
            const basic = {
                [filterId]: {
                    [FILTER_OPERATOR.GREATER_OR_EQUAL]: 1,
                    [FILTER_OPERATOR.SMALLER_OR_EQUAL]: 3,
                },
            };
            const result = `${filterId}${FILTER_OPERATOR.GREATER_OR_EQUAL}1;${filterId}${FILTER_OPERATOR.SMALLER_OR_EQUAL}3;${advFilterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getParsedFilters({
                ...basic,
                ...advanced,
            })).toStrictEqual(result);
        });

        it('Basic are overwritten by advanced filters', () => {
            const advFilterId = 456;
            const advanced = {
                [advFilterId]: {
                    [FILTER_OPERATOR.EQUAL]: 'Test',
                },
            };
            const basic = {
                [advFilterId]: {
                    [FILTER_OPERATOR.GREATER_OR_EQUAL]: 1,
                    [FILTER_OPERATOR.SMALLER_OR_EQUAL]: 3,
                },
            };
            const result = `${advFilterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getParsedFilters({
                ...basic,
                ...advanced,
            })).toStrictEqual(result);
        });
    });
});

describe('gridDataMapper/getParsedFiltersList', () => {
    it('Validate that filters without value are removed', () => {
        const filters = {
            'code_2:en_GB': {
                '=': 1,
            },
            'code_3:en_GB': {
                '=': '',
            },
            'code_4:en_GB': {
                '=': [],
            },
        };

        const result = [
            {
                column: 'code_2',
                operator: '=',
                value: 1,
                language: 'en_GB',
            },
        ];

        expect(getParsedFiltersList(filters)).toStrictEqual(result);
    });

    it('Validate filters languages', () => {
        const filters = {
            'code_2:en_GB': {
                '=': 1,
            },
            code_3: {
                '=': 11,
            },
        };

        const result = [
            {
                column: 'code_2',
                operator: '=',
                value: 1,
                language: 'en_GB',
            },
            {
                column: 'code_3',
                operator: '=',
                value: 11,
            },
        ];

        expect(getParsedFiltersList(filters)).toStrictEqual(result);
    });
});

describe('gridDataMapper/getDraftsBasedOnCellValues', () => {
    it('Based on values list creates the key value map', () => {
        const cellValues = [
            {
                rowId: '123-12312-33',
                columnId: 'code_1:en_GB',
                value: 'test123',
            },
            {
                rowId: '1312-312-3323',
                columnId: 'code_2:en_GB',
                value: [
                    1,
                    2,
                    3,
                ],
            },
        ];

        const result = {
            '123-12312-33/code_1:en_GB': 'test123',
            '1312-312-3323/code_2:en_GB': [
                1,
                2,
                3,
            ],
        };

        expect(getDraftsBasedOnCellValues(cellValues)).toStrictEqual(result);
    });
});

describe('gridDataMapper/getFilterQueryParams', () => {
    describe('Merging filters and advanced filters into one filter', () => {
        it('Both filters are defined', () => {
            const filter = 'code_32:pl_PL=nazwa';
            const advancedFilter = 'code_1:en_GB=23;code_2:en_GB=3213';
            const result = 'code_1:en_GB=23;code_2:en_GB=3213;code_32:pl_PL=nazwa';

            expect(getFilterQueryParams({
                filter,
                advancedFilter,
            })).toStrictEqual(result);
        });

        it('Only basic filters are defined', () => {
            const filter = 'code_32:pl_PL=nazwa';
            const result = 'code_32:pl_PL=nazwa';

            expect(getFilterQueryParams({
                filter,
            })).toStrictEqual(result);
        });

        it('Only advanced filters are defined', () => {
            const advancedFilter = 'code_1:en_GB=23;code_2:en_GB=3213';
            const result = 'code_1:en_GB=23;code_2:en_GB=3213';

            expect(getFilterQueryParams({
                advancedFilter,
            })).toStrictEqual(result);
        });
    });
});

describe('gridDataMapper/getParams', () => {
    const cookieColumns = {};
    const $route = {
        query: {},
    };
    const $cookies = {
        get: key => cookieColumns[key] || '',
    };

    it('Getting params with default values', () => {
        const result = {
            offset: 0,
            limit: 25,
            extended: true,
            columns: '',
        };

        expect(getParams({
            $route,
            $cookies,
        })).toStrictEqual(result);
    });

    it('Getting params with sort params', () => {
        const result = {
            offset: 0,
            limit: 25,
            extended: true,
            columns: '',
            field: 'code_1:en_GB',
            order: 'ASC',
        };

        expect(getParams({
            $route: {
                ...$route,
                query: {
                    field: 'code_1:en_GB',
                    order: 'ASC',
                },
            },
            $cookies,
        })).toStrictEqual(result);
    });

    it('Getting params with filters', () => {
        const result = {
            offset: 0,
            limit: 25,
            extended: true,
            columns: '',
            filter: 'code_32:pl_PL=nazwa',
        };

        expect(getParams({
            $route: {
                ...$route,
                query: {
                    filter: 'code_32:pl_PL=nazwa',
                },
            },
            $cookies,
        })).toStrictEqual(result);
    });

    it('Getting params with advanced filters', () => {
        const result = {
            offset: 0,
            limit: 25,
            extended: true,
            columns: '',
            filter: 'code_1:en_GB=23;code_2:en_GB=3213',
        };

        expect(getParams({
            $route: {
                ...$route,
                query: {
                    advancedFilter: 'code_1:en_GB=23;code_2:en_GB=3213',
                },
            },
            $cookies,
        })).toStrictEqual(result);
    });
});

describe('gridDataMapper/getMappedFilters', () => {
    describe('Based on filters in query params get the data model which matches Grid data structure', () => {
        it('Return when query filters are not defined', () => {
            const queryFilters = '';
            const result = {};

            expect(getMappedFilters(queryFilters)).toStrictEqual(result);
        });

        it('Parse primitive values', () => {
            const queryFilters = 'code_1:en_GB=123';
            const result = {
                'code_1:en_GB': {
                    '=': '123',
                },
            };

            expect(getMappedFilters(queryFilters)).toStrictEqual(result);
        });

        it('Parse array values', () => {
            const queryFilters = 'code_2:en_GB=[123]';
            const result = {
                'code_2:en_GB': {
                    '=': [
                        '123',
                    ],
                },
            };

            expect(getMappedFilters(queryFilters)).toStrictEqual(result);
        });

        it('Parse range values', () => {
            const queryFilters = 'code_3:en_GB>=2021-06-07;code_3:en_GB<=2021-06-15';
            const result = {
                'code_3:en_GB': {
                    '>=': '2021-06-07',
                    '<=': '2021-06-15',
                },
            };

            expect(getMappedFilters(queryFilters)).toStrictEqual(result);
        });

        it('When query filter is equal an empty string, return isEmptyRecord flag', () => {
            const queryFilters = 'code_4:en_GB=';
            const result = {
                'code_4:en_GB': {
                    isEmptyRecord: true,
                },
            };

            expect(getMappedFilters(queryFilters)).toStrictEqual(result);
        });
    });
});

describe('gridDataMapper/getSortedColumnsByIDs', () => {
    describe('Validation of correct columns order', () => {
        const columns = [
            {
                id: 1,
            },
            {
                id: 3,
            },
            {
                id: 5,
            },
            {
                id: 4,
            },
            {
                id: 3,
            },
        ];

        it('Column ids are not passed, columns will not be sorted', () => {
            expect(getSortedColumnsByIDs(columns)).toStrictEqual(columns);
        });

        it('Columns are sorted by given order', () => {
            const columnsId = [
                1,
                3,
                3,
                4,
                5,
            ];
            const result = [
                {
                    id: 1,
                },
                {
                    id: 3,
                },
                {
                    id: 3,
                },
                {
                    id: 4,
                },
                {
                    id: 5,
                },
            ];

            expect(getSortedColumnsByIDs(columns, columnsId)).toStrictEqual(result);
        });
    });
});

describe('gridDataMapper/getDefaultDataFromQueryParams', () => {
    it('Get default data from query params', () => {
        const $route = {
            query: {},
        };

        const result = {
            filterValues: {},
            advancedFilterValues: {},
            pagination: {
                page: 1,
                itemsPerPage: 25,
            },
            sortOrder: {
                field: '',
                order: '',
            },
        };

        expect(getDefaultDataFromQueryParams($route)).toStrictEqual(result);
    });

    it('Get data from query params', () => {
        const $route = {
            query: {
                page: 2,
                itemsPerPage: 100,
                filter: 'code_1:en_GB=123',
                advancedFilter: 'code_1:en_GB=23;code_2:en_GB=3213',
                field: 'code_1:en_GB',
                order: 'ASC',
            },
        };

        const result = {
            filterValues: {
                'code_1:en_GB': {
                    '=': '123',
                },
            },
            advancedFilterValues: {
                'code_1:en_GB': {
                    '=': '23',
                },
                'code_2:en_GB': {
                    '=': '3213',
                },
            },
            pagination: {
                page: 2,
                itemsPerPage: 100,
            },
            sortOrder: {
                field: 'code_1:en_GB',
                order: 'ASC',
            },
        };

        expect(getDefaultDataFromQueryParams($route)).toStrictEqual(result);
    });
});
