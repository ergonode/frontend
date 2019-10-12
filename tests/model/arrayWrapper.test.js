/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    swapItemPosition,
    getObjectWithMaxValueInArrayByObjectKey,
    isArrayEqualToArray,
    arrayToObject,
    sumIntegers,
    insertValueAtIndex,
} from '~/model/arrayWrapper';

describe('arrayWrapper/swapItemPosition', () => {
    it('Change array items position. Pos1 bigger then pos2', () => {
        const array = [6, 6, 5, 2];
        const obj = swapItemPosition(array, 3, 1);
        expect(obj).toEqual([6, 2, 6, 5]);
    });

    it('Change array items position. Pos2 bigger then pos1', () => {
        const array = [6, 6, 5, 2];
        const obj = swapItemPosition(array, 1, 3);
        expect(obj).toEqual([6, 5, 2, 6]);
    });

    it('Change array items position. Incorrect positions', () => {
        const array = [6, 6, 5, 2];
        const obj = swapItemPosition(array, 6, 3);
        expect(obj).toEqual([6, 6, 5, 2]);
    });
});

describe('arrayWrapper/maxObjectValueInArrayByObjectKeyByObjectKey', () => {
    it('Getting max value of object property in array', () => {
        const array = [{ a: 1 }, null, { a: 2 }, { a: 6 }, { a: 2 }, null];

        const maxObject = getObjectWithMaxValueInArrayByObjectKey(array, 'a');

        expect(maxObject.a).toEqual(6);
    });

    it('Array has no elements', () => {
        const maxObject = getObjectWithMaxValueInArrayByObjectKey([], 'a');

        expect(maxObject).toEqual(null);
    });
});

describe('arrayWrapper/isArrayEqualToArray', () => {
    it('Arrays are equal', () => {
        let arr1 = [1, 2, 3, 4];
        let arr2 = [1, 2, 3, 4];

        let areEqual = isArrayEqualToArray(arr1, arr2);

        expect(areEqual).toEqual(true);

        arr1 = [];
        arr2 = [];

        areEqual = isArrayEqualToArray(arr1, arr2);

        expect(areEqual).toEqual(true);
    });

    it('Arrays are not equal', () => {
        let arr1 = [1, 2, 3];
        let arr2 = [1, 2, 3, 4];

        let areEqual = isArrayEqualToArray(arr1, arr2);

        expect(areEqual).toEqual(false);

        arr1 = [1];
        arr2 = [2, 3];

        areEqual = isArrayEqualToArray(arr1, arr2);

        expect(areEqual).toEqual(false);

        arr1 = [1, 2];
        arr2 = [2, 3];

        areEqual = isArrayEqualToArray(arr1, arr2);

        expect(areEqual).toEqual(false);
    });
});

describe('arrayToObject/arrayWrapper', () => {
    it('Mapping array with objects into object with key values', () => {
        const array = [
            {
                id: '1',
                name: 'Maciek',
                age: 12,
            },
            {
                id: '2',
                name: 'Adam',
                age: 13,
            },
            {
                id: '3',
                name: 'Piotrek',
                age: 21,
            },
        ];
        const keyField = 'id';
        const value = 'name';
        const result = arrayToObject(array, keyField, value);

        expect(result).toStrictEqual({
            1: 'Maciek',
            2: 'Adam',
            3: 'Piotrek',
        })
    });
});

describe('sumIntegers/arrayWrapper', () => {
    it('Summing array integers values', () => {
        const array = [1, 2, 3, -3, '3'];
        const result = sumIntegers(array);

        expect(result).toEqual(3);
    });

    it('Passed value is not an array', () => {
        const result = sumIntegers(null);

        expect(result).toEqual(0);
    })
});

describe('insertValueAtIndex/arrayWrapper', () => {
    it('Inserting value at given index', function () {
        const array = [1, 2, 3, 0, -2, {}, 'ads'];
        const result = insertValueAtIndex(array, 5, 3);

        expect(result).toStrictEqual([1, 2, 3, 5, 0, -2, {}, 'ads']);
    });
});

