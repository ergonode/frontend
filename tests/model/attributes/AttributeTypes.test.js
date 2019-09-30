/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    hasOptions,
    hasPlaceholder,
    hasParams,
    hasParamsWithMultiSelect,
    getIcon,
    getParamsOptionsForType,
    getParamsKeyForType,
    getTypeElement,
    getTypeTranslation,
} from '~/model/attributes/AttributeTypes';

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

describe('AttributeTypes/hasParamsWithMultiSelect', () => {
    it('Attribute has params with multiselect', () => {
        const fun = hasParamsWithMultiSelect('IMAGE');
        expect(fun).toBeTruthy();
    });

    it('Attribute has not params with multiselect', () => {
        const fun = hasParamsWithMultiSelect('TEXT');
        expect(fun).toBeFalsy();
    });
});

describe('AttributeTypes/getIcon', () => {
    it.each([
        ['TEXT', 'Text'],
        ['TEXTAREA', 'Textarea'],
        ['NUMERIC', 'Numeric'],
        ['SELECT', 'Select'],
        ['MULTI_SELECT', 'MultiSelect'],
        ['IMAGE', 'Image'],
        ['PRICE', 'Price'],
        ['UNIT', 'Unit'],
        ['DATE', 'Date'],
        ['OTHER_TYPE', ''],
    ])(
        ' Set type (%s) get class (%s)',
        (type, expected) => {
            const fun = getIcon(type);
            expect(fun).toBe(expected);
        },
    );
});

describe('AttributeTypes/getTypeTranslation', () => {
    it.each([
        ['TEXT', 'TEXT'],
        ['TEXTAREA', 'TEXT AREA'],
        ['NUMERIC', 'NUMERIC'],
        ['SELECT', 'SELECT'],
        ['MULTI_SELECT', 'MULTI SELECT'],
        ['IMAGE', 'IMAGE'],
        ['PRICE', 'PRICE'],
        ['UNIT', 'UNIT'],
        ['DATE', 'DATE'],
        ['OTHER_TYPE', ''],
    ])(
        ' Set type (%s) get class (%s)',
        (type, expected) => {
            const fun = getTypeTranslation(type);
            expect(fun).toBe(expected);
        },
    );
});

describe('AttributeTypes/getParamsOptionsForType', () => {
    const data = {
        units: ['Kg'],
        dateFormats: ['YYYY-MM-DD'],
        currencies: ['PLN'],
        imageFormats: ['jpg'],
    };
    it.each([
        ['IMAGE', data.imageFormats],
        ['PRICE', data.currencies],
        ['UNIT', data.units],
        ['DATE', data.dateFormats],
        ['OTHER_TYPE', []],

    ])(
        ' Set type (%s) and get params options (%s)',
        (type, expected) => {
            const fun = getParamsOptionsForType(type, data);
            expect(fun).toEqual(expected);
        },
    );
});

describe('AttributeTypes/getParamsKeyForType', () => {
    it.each([
        ['IMAGE', 'formats'],
        ['PRICE', 'currency'],
        ['UNIT', 'unit'],
        ['DATE', 'format'],
        ['OTHER_TYPE', ''],

    ])(
        ' Set type (%s) and get params key (%s)',
        (type, expected) => {
            const fun = getParamsKeyForType(type);
            expect(fun).toBe(expected);
        },
    );
});

describe('AttributeTypes/getTypeElement', () => {
    it.each([
        ['TEXT', 'SingleLine'],
        ['TEXTAREA', 'MultiLine'],
        ['NUMERIC', 'SingleLine'],
        ['SELECT', 'Options'],
        ['MULTI_SELECT', 'Options'],
        ['IMAGE', 'Image'],
        ['PRICE', 'SingleLine'],
        ['UNIT', 'SingleLine'],
        ['DATE', 'Date'],
        ['OTHER_TYPE', 'SingleLine'],
    ])(
        ' Set type (%s) and get params key (%s)',
        (type, expected) => {
            const fun = getTypeElement(type);
            expect(fun).toBe(expected);
        },
    );
});
