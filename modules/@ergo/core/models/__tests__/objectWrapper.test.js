/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getKeyByValue,
    getNestedObjectByKeyWithValue,
    objectToArray,
    objectToArrayWithPropsName,
    getValueByKey,
    getKeysByValues,
    getValuesByKeys,
    getMaxKeyValue,
    isEmpty,
    removeFromObjectByKey,
} from '@Core/models/objectWrapper';

const obj = { test: 1, jest: 2 };

describe('objectWrapper/getKeyByValue', () => {
    it('Get key by value when value is exist', () => {
        const fun = getKeyByValue(obj, 1);
        expect(fun).toBe('test');
    });

    it('Get undefined if the value does not exist', () => {
        const fun = getKeyByValue(obj, 5);
        expect(fun).toBeUndefined();
    });
});

describe('objectWrapper/getNestedObjectByKeyWithValue', () => {
    const localObj = {
        test: [
            { x: 'xx', y: 'yy' },
            { z: 'zz', q: 'qq' },
        ],
        jest: [
            { a: 'aa', b: 'bb' },
            { c: 'cc', d: 'dd' },
        ],
    };

    it('Get nested object by key and value - exist object ', () => {
        const fun = getNestedObjectByKeyWithValue(localObj, 'z', 'zz');
        expect(fun).toEqual({ z: 'zz', q: 'qq' });
    });

    it('Get nested object by key and value - does not exist object ', () => {
        const fun = getNestedObjectByKeyWithValue(localObj, 'g', 'gg');
        expect(fun).toEqual(null);
    });
});

describe('objectWrapper/objectToArray', () => {
    it('Prepare array from the object', () => {
        const fun = objectToArray(obj);
        expect(fun).toEqual([{ title: 1, value: 'test' }, { title: 2, value: 'jest' }]);
    });
});

describe('objectWrapper/objectToArrayWithPropsName', () => {
    it('Convert object to array of objects - default ', () => {
        const fun = objectToArrayWithPropsName(obj);
        expect(fun).toEqual([{ id: 'test', name: 1 }, { id: 'jest', name: 2 }]);
    });

    it('Convert object to array of objects - own props', () => {
        const fun = objectToArrayWithPropsName(obj, 'value', 'key');
        expect(fun).toEqual([{ key: 'test', value: 1 }, { key: 'jest', value: 2 }]);
    });
});

describe('objectWrapper/getValueByKey', () => {
    it('Get value by key', () => {
        const fun = getValueByKey(obj, 'jest');
        expect(fun).toEqual(2);
    });

    it('Get value by key when key does not exist', () => {
        const fun = getValueByKey(obj, 'test1');
        expect(fun).toEqual('');
    });
});

describe('objectWrapper/getKeysByValues', () => {
    it('Get keys by values', () => {
        const values = [1, 2];
        const fun = getKeysByValues(obj, values);
        expect(fun).toEqual(['test', 'jest']);
    });

    it('Get empty key array when values array is empty ', () => {
        const values = [];
        const fun = getKeysByValues(obj, values);
        expect(fun).toEqual([]);
    });
});

describe('objectWrapper/getValuesByKeys', () => {
    it('Get values by keys', () => {
        const keys = ['test', 'jest'];
        const fun = getValuesByKeys(obj, keys);
        expect(fun).toEqual([1, 2]);
    });

    it('Get empty value array when keys array is empty ', () => {
        const keys = [];
        const fun = getValuesByKeys(obj, keys);
        expect(fun).toEqual([]);
    });
});

describe('objectWrapper/getMaxKeyValue', () => {
    it('Get max key from not number keys', () => {
        const fun = getMaxKeyValue(obj);
        expect(fun).toBeNaN();
    });

    it('Get max key from number keys', () => {
        const localObj = { 5: 'a', 3: 'r', 9: 'w' };
        const fun = getMaxKeyValue(localObj);
        expect(fun).toBe(10);
    });
});


describe('objectWrapper/isEmpty', () => {
    it('Get false when object is not empty', () => {
        const fun = isEmpty(obj);
        expect(fun).toBeFalsy();
    });

    it('Get true when object is empty', () => {
        const localObj = {};
        const fun = isEmpty(localObj);
        expect(fun).toBeTruthy();
    });

    it('Get true when not object', () => {
        const localObj = null;
        const fun = isEmpty(localObj);
        expect(fun).toBeTruthy();
    });
});

describe('objectWrapper/removeFromObjectByKey', () => {
    it('Remove element from obect by key', () => {
        const fun = removeFromObjectByKey(obj, 'jest');
        expect(fun).toEqual({ test: 1 });
    });

    it('Return object when key is invalid', () => {
        const fun = removeFromObjectByKey(obj, 'jest2');
        expect(fun).toEqual({ test: 1, jest: 2 });
    });
});
