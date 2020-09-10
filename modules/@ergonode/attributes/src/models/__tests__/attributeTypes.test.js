/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getParamsKeyForType,
    getParamsOptionsForType,
    hasOptions,
    hasParams,
    hasPlaceholder,
} from '../attributeTypes';

describe('AttributeTypes/hasOptions', () => {
    it('Attribute has options', () => {
        const fun = hasOptions('SELECT');
        expect(fun).toBeTruthy();
    });

    it('Attribute has not options', () => {
        const fun = hasOptions('TEXT');
        expect(fun).toBeFalsy();
    });
});

describe('AttributeTypes/hasPlaceholder', () => {
    it('Attribute has placeholder', () => {
        const fun = hasPlaceholder('TEXT');
        expect(fun).toBeTruthy();
    });
    it('Attribute has not placeholder', () => {
        const fun = hasPlaceholder('SELECT');
        expect(fun).toBeFalsy();
    });
});

describe('AttributeTypes/hasParams', () => {
    it('Attribute has params', () => {
        const fun = hasParams('PRICE');
        expect(fun).toBeTruthy();
    });

    it('Attribute has not params', () => {
        const fun = hasParams('TEXT');
        expect(fun).toBeFalsy();
    });
});

describe('AttributeTypes/getParamsOptionsForType', () => {
    const data = {
        units: [
            'Kg',
        ],
        dateFormats: [
            'YYYY-MM-DD',
        ],
        currencies: [
            'PLN',
        ],
    };
    it.each([
        [
            'PRICE',
            data.currencies,
        ],
        [
            'UNIT',
            data.units,
        ],
        [
            'DATE',
            data.dateFormats,
        ],
        [
            'OTHER_TYPE',
            {},
        ],

    ])('Set type (%s) and get params options (%s)',
        (type, expected) => {
            const fun = getParamsOptionsForType(type, data);
            expect(fun).toEqual(expected);
        });
});

describe('AttributeTypes/getParamsKeyForType', () => {
    it.each([
        [
            'PRICE',
            'currency',
        ],
        [
            'UNIT',
            'unit',
        ],
        [
            'DATE',
            'format',
        ],
        [
            'OTHER_TYPE',
            '',
        ],

    ])('Set type (%s) and get params key (%s)',
        (type, expected) => {
            const fun = getParamsKeyForType(type);
            expect(fun).toBe(expected);
        });
});
