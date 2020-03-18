/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedGroupsElementsCount,
    getMappedOptions,
    getParsedType,
    getParsedParameterKeys,
    getParsedOptions,
} from '~/model/mappers/attributeMapper';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list';

describe('attributeMapper/getParsedOptions', () => {
    describe('Based on form data, data is mapped into API structure', () => {
        it('Non multilingual attribute', () => {
            const options = {
                0: { key: 'key1', value: 'val1' },
                1: { key: 'key2', value: 'val2' },
            };
            const result = [
                {
                    key: 'key1',
                    value: 'val1',
                },
                {
                    key: 'key2',
                    value: 'val2',
                },
            ];

            expect(getParsedOptions(options)).toStrictEqual(result);
        });

        describe('Multilingual attribute', () => {
            it('All values has translation', () => {
                const options = {
                    0: { key: 'key1', value: { EN: 'val1' } },
                    1: { key: 'key2', value: { EN: 'val2' } },
                };
                const result = [
                    {
                        key: 'key1',
                        value: { EN: 'val1' },
                    },
                    {
                        key: 'key2',
                        value: { EN: 'val2' },
                    },
                ];

                expect(getParsedOptions(options)).toStrictEqual(result);
            });

            it('Some of them are not', () => {
                const options = {
                    0: {
                        key: 'key1',
                        value: { EN: 'val1' },
                    },
                    1: {
                        key: 'key2',
                        value: null,
                    },
                    2: {
                        key: 'key3',
                        value: { PL: 'val3' },
                    },
                };
                const result = [
                    {
                        key: 'key1',
                        value: { EN: 'val1' },
                    },
                    {
                        key: 'key2',
                        value: null,
                    },
                    {
                        key: 'key3',
                        value: { PL: 'val3' },
                    },
                ];

                expect(getParsedOptions(options)).toStrictEqual(result);
            });
        });
    });
});

describe('attributeMapper/getMappedOptions', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        it('Non multilingual attribute', () => {
            const apiData = [
                {
                    key: 'key1',
                    value: 'val1',
                },
                {
                    key: 'key2',
                    value: null,
                },
            ];
            const result = {
                0: { key: 'key1', value: 'val1' },
                1: { key: 'key2', value: null },
            };
            expect(getMappedOptions(apiData)).toStrictEqual(result);
        });

        it('Multilingual attribute', () => {
            const apiData = [
                {
                    key: 'key1',
                    value: {
                        EN: 'val1',
                    },
                },
                {
                    key: 'key2',
                    value: null,
                },
            ];
            const result = {
                0: {
                    key: 'key1',
                    value: { EN: 'val1' },
                },
                1: {
                    key: 'key2',
                    value: null,
                },
            };
            expect(getMappedOptions(apiData)).toStrictEqual(result);
        });
    });
});

describe('attributeMapper/getMappedGroupsElementsCount', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        it('Counting elements for each group', () => {
            const allGroups = ['first', 'second'];
            const oneGroup = ['first'];
            const noneGroup = [];
            const elements = [
                {
                    groups: allGroups,
                },
                {
                    groups: oneGroup,
                },
                {
                    groups: allGroups,
                },
                {
                    groups: noneGroup,
                },
                {
                    groups: noneGroup,
                },
                {
                    groups: noneGroup,
                },
            ];
            const result = {
                first: 3,
                second: 2,
                [UNASSIGNED_GROUP_ID]: 3,
            };

            expect(getMappedGroupsElementsCount(elements)).toStrictEqual(result);
        });
    });
});

describe('attributeMapper/getParsedParameterKeys', () => {
    describe('Based on attribute parameters data, data is mapped into API structure', () => {
        describe('Parsing parameter keys into key values data structure', () => {
            it('Selected parameters are an object', () => {
                const selectedType = 'PRICE';
                const selectedParam = 'Euro';
                const result = {
                    currency: 'Euro',
                };

                expect(getParsedParameterKeys({
                    selectedType,
                    selectedParam,
                })).toStrictEqual(result);
            });
        });
    });
});

describe('attributeMapper/getMappedParameterValues', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        // const data = {
        //     imageFormats: {
        //         JPG: 'Jpg',
        //         PNG: 'Png',
        //         TIFF: 'Tiff',
        //     },
        //     currencies: {
        //         EURO: 'Euro',
        //         PLN: 'Zloty',
        //     },
        // };

        // TODO: Finish tests!!
        it('Selected parameters are array', () => {
            // const type = 'IMAGE';
            // const param = ['JPG', 'PNG'];
            // const result = ['Jpg', 'Png'];
            //
            // expect(getMappedParameterValues(type, param, data)).toStrictEqual(result);
        });

        it('Selected parameter is an object', () => {
            // const type = 'PRICE';
            // const param = 'EURO';
            // const result = 'Euro';
            //
            // expect(getMappedParameterValues(type, param, data)).toStrictEqual(result);
        });
    });
});

describe('attributeMapper/getParsedType', () => {
    describe('Based on attribute types data, data is mapped into API structure', () => {
        it('Getting type object key based on his value', () => {
            const types = {
                TEXT: 'text',
                SELECT: 'select',
            };
            const selectedType = 'text';

            expect(getParsedType(types, selectedType)).toEqual('TEXT');
        });
    });
});
