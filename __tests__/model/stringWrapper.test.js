/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    toCapitalize,
    capitalizeAndConcatenationArray,
    getUUID,
} from '~/model/stringWrapper';

describe('String operations', () => {
    it('Capitalize first letter', () => {
        const fun = toCapitalize('tEst');
        expect(fun).toBe('TEst');
    });

    it('Capitalize when no value', () => {
        const fun = toCapitalize();
        expect(fun).toBe('');
    });

    it('Capitalize and concatenation array', () => {
        const strings = ['test', 'jest'];
        const fun = capitalizeAndConcatenationArray(strings);
        expect(fun).toBe('TestJest');
    });

    it('generate UUID', () => {
        const uuid = getUUID();
        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(9);
    });
});
