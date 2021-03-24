/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    slotText,
    text,
} from '@Core/models/__tests__/__mocks__';
import {
    capitalizeAndConcatenationArray,
    formatBytes,
    getSlots,
    getUUID,
    toCapitalize,
    toLowerCaseFirstLetter,
} from '@Core/models/stringWrapper';

describe('stringWrapper/toCapitalize', () => {
    it('Capitalize first letter', () => {
        const fun = toCapitalize('tEst');
        expect(fun).toEqual('TEst');
    });

    it('Capitalize when no value', () => {
        const fun = toCapitalize();
        expect(fun).toEqual('');
    });
});

describe('stringWrapper/toLowerCaseFirstLetter', () => {
    it('Make first letter lowercase', () => {
        const fun = toLowerCaseFirstLetter('Test');
        expect(fun).toEqual('test');
    });

    it('When no string is passed', () => {
        expect(toLowerCaseFirstLetter()).toEqual('');
    });
});

describe('stringWrapper/capitalizeAndConcatenationArray', () => {
    it('Capitalize and concatenation array', () => {
        const strings = [
            'test',
            'jest',
        ];
        const fun = capitalizeAndConcatenationArray(strings);
        expect(fun).toEqual('TestJest');
    });
});

describe('stringWrapper/getUUID', () => {
    it('generate UUID', () => {
        const uuid = getUUID();
        expect(typeof uuid).toBe('string');
        expect(uuid.length).toEqual(9);
    });
});

describe('stringWrapper/formatBytes', () => {
    it('When bytes are 0', () => {
        const result = formatBytes('0');

        expect(result).toEqual('0 Bytes');
    });

    it('When bytes are not set', () => {
        const result = formatBytes();

        expect(result).toEqual('0 Bytes');
    });

    it('Converted into KB', () => {
        const result = formatBytes('1024');

        expect(result).toEqual('1 KB');
    });

    it('Converted into GB', () => {
        const result = formatBytes('1073741824');

        expect(result).toEqual('1 GB');
    });
});

describe('stringWrapper/getSlots', () => {
    it('Based at given text, generate slots', () => {
        const result = getSlots(text);

        expect(result.length).toEqual(1);
        expect(result[0].text).toEqual(slotText);
    });
});
