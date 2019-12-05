/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedParameterValues,
    getMappedGroups,
    getMappedGroupsElementsCount,
    getMappedOptionKeysValues,
    getParsedType,
    getParsedParameterKeys,
    getParsedGroups,
    getParsedOptions,
} from '~/model/mappers/attributeMapper';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list';

describe('attributeMapper/getParsedOptions', () => {
    describe('Based on form data, data is mapped into API structure', () => {
        it('Non multilingual attribute', () => {
            const optionKeys = ['key1', 'key2'];
            const optionValues = [{ 0: 'val1' }, { 1: 'val2' }];
            const result = [
                {
                    key: 'key1',
                    value: { 0: 'val1' },
                },
                {
                    key: 'key2',
                    value: { 1: 'val2' },
                },
            ];

            expect(getParsedOptions(optionKeys, optionValues, false)).toStrictEqual(result);
        });

        describe('Multilingual attribute', () => {
            it('All values has translation', () => {
                const optionKeys = ['key1', 'key2'];
                const optionValues = { EN: ['val1', 'val2'] };
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

                expect(getParsedOptions(optionKeys, optionValues, true)).toStrictEqual(result);
            });

            it('Some of them are not', () => {
                const optionKeys = ['key1', 'key2'];
                const optionValues = { EN: ['val1'] };
                const result = [
                    {
                        key: 'key1',
                        value: { EN: 'val1' },
                    },
                    {
                        key: 'key2',
                        value: {},
                    },
                ];

                expect(getParsedOptions(optionKeys, optionValues, true)).toStrictEqual(result);
            })
        });
    });
});

describe('attributeMapper/getMappedOptionKeysValues', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        it('Non multilingual attribute', () => {
            const apiData = [
                {
                    key: "key1",
                    value: 'val1',
                },
                {
                    key: "key2",
                    value: null,
                }
            ];
            const result = {
                optionKeys: ['key1', 'key2'],
                optionValues: ['val1'],
            };
            expect(getMappedOptionKeysValues(apiData, false));
        });

        it('Multilingual attribute', () => {
            const apiData = [
                {
                    key: "key1",
                    value: {
                        EN: "val1",
                    }
                },
                {
                    key: "key2",
                    value: null,
                }
            ];
            const result = {
                optionKeys: ['key1', 'key2'],
                optionValues: {
                    value: { EN: 'val1' },
                },
            };
            expect(getMappedOptionKeysValues(apiData, true));
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

describe('attributeMapper/getMappedGroups', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        it('Looking for groups based on all groups in app', () => {
            const groupIds = [1, 2];
            const groupOptions = [
                {
                    key: 1,
                    value: 'first',
                },
                {
                    key: 2,
                    value: 'second',
                },
                {
                    key: 3,
                    value: 'third',
                },
            ];
            const result = [
                {
                    key: 1,
                    value: 'first',
                },
                {
                    key: 2,
                    value: 'second',
                },
            ];

            expect(getMappedGroups(groupIds, groupOptions)).toStrictEqual(result);
        });
    });
});

describe('attributeMapper/getParsedGroups', () => {
    describe('Based on attribute groups data, data is mapped into API structure', () => {
        it('Parsing attribute groups keys', () => {
            const groups = [
                {
                    key: 1,
                    value: 'first',
                },
                {
                    key: 2,
                    value: 'second',
                },
                {
                    key: 3,
                    value: 'third',
                },
            ];

            const result = [
                1,
                2,
                3,
            ];

            expect(getParsedGroups(groups)).toStrictEqual(result);
        });
    });
});

describe('attributeMapper/getParsedParameterKeys', () => {
    describe('Based on attribute parameters data, data is mapped into API structure', () => {
        describe('Parsing parameter keys into key values data structure', () => {
            const types = {
                TEXT: 'TEXT',
                SELECT: 'SELECT',
                UNIT: 'UNIT',
                PRICE: 'PRICE',
                IMAGE: 'IMAGE',
            };
            const data = {
                imageFormats: {
                    JPG: 'Jpg',
                    PNG: 'Png',
                    TIFF: 'Tiff',
                },
                currencies: {
                    EURO: 'Euro',
                    PLN: 'Zloty',
                },
            };

            it('Selected parameters are array', () => {
                const selectedType = 'IMAGE';
                const selectedParam = ['Jpg', 'Png'];
                const result = {
                    formats: ['JPG', 'PNG'],
                };

                expect(getParsedParameterKeys(
                    types,
                    selectedType,
                    selectedParam,
                    data,
                )).toStrictEqual(result);
            });

            it('Selected parameters are an object', () => {
                const selectedType = 'PRICE';
                const selectedParam = 'Euro';
                const result = {
                    currency: 'EURO',
                };

                expect(getParsedParameterKeys(
                    types,
                    selectedType,
                    selectedParam,
                    data,
                )).toStrictEqual(result);
            });
        });
    });
});

describe('attributeMapper/getMappedParameterValues', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        const data = {
            imageFormats: {
                JPG: 'Jpg',
                PNG: 'Png',
                TIFF: 'Tiff',
            },
            currencies: {
                EURO: 'Euro',
                PLN: 'Zloty',
            },
        };

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
            const result = types.TEXT;

            expect(getParsedType(types, selectedType)).toEqual('TEXT');
        });
    });
});
