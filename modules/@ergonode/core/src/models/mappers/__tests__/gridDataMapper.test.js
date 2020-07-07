/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    getMergedFilters,
    getParsedFilter,
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
            const result = `${id}${FILTER_OPERATOR.EQUAL}1,2,3`;

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

describe('gridDataMapper/getMergedFilters', () => {
    describe('Validate merged basic with advanced filters', () => {
        it('Only basic filters', () => {
            const filterId = 123;
            const basic = {
                [filterId]: `${filterId}${FILTER_OPERATOR.EQUAL}Test`,
            };
            const advanced = {};
            const result = `${filterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getMergedFilters({
                basic,
                advanced,
            })).toStrictEqual(result);
        });

        it('Only advanced filters', () => {
            const filterId = 123;
            const advanced = {
                [filterId]: `${filterId}${FILTER_OPERATOR.EQUAL}Test`,
            };
            const basic = {};
            const result = `${filterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getMergedFilters({
                basic,
                advanced,
            })).toStrictEqual(result);
        });

        it('Unique filters', () => {
            const filterId = 123;
            const advFilterId = 456;
            const advanced = {
                [advFilterId]: `${advFilterId}${FILTER_OPERATOR.EQUAL}Test`,
            };
            const basic = {
                [filterId]: `${filterId}${FILTER_OPERATOR.GREATER_OR_EQUAL}1;${filterId}${FILTER_OPERATOR.SMALLER_OR_EQUAL}3`,
            };
            const result = `${filterId}${FILTER_OPERATOR.GREATER_OR_EQUAL}1;${filterId}${FILTER_OPERATOR.SMALLER_OR_EQUAL}3;${advFilterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getMergedFilters({
                basic,
                advanced,
            })).toStrictEqual(result);
        });

        it('Basic are overwritten by advanced filters', () => {
            const filterId = 123;
            const advFilterId = 456;
            const advanced = {
                [advFilterId]: `${advFilterId}${FILTER_OPERATOR.EQUAL}Test`,
            };
            const basic = {
                [advFilterId]: `${filterId}${FILTER_OPERATOR.GREATER_OR_EQUAL}1;${filterId}${FILTER_OPERATOR.SMALLER_OR_EQUAL}3`,
            };
            const result = `${advFilterId}${FILTER_OPERATOR.EQUAL}Test`;

            expect(getMergedFilters({
                basic,
                advanced,
            })).toStrictEqual(result);
        });
    });
});

describe('gridDataMapper/getSortedColumnsByIDs', () => {
    describe('Validation of correct columns order', () => {
        it('Columns are sorted by given order', () => {
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
