/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/** @module objectWrapper */

/**
 * Returns key by value in the object
 * @function
 * @param {Object} object
 * @param {string|number} value
 * @returns {string} Key for value
 */
export function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

/**
 * Returns nested object searched by key and value
 * @function
 * @param {Object} object
 * @param {string} key
 * @param {string|number} value
 * @returns {?Object} Object with searched key and value
 */
export function getNestedObjectByKeyWithValue(object, key, value) {
    let lookingNestedObject = null;

    Object.values(object).some((values) => values.some((nestedObject) => {
        if (nestedObject[key] === value) {
            lookingNestedObject = { ...nestedObject };
            return true;
        }
        return false;
    }));

    return lookingNestedObject;
}

/**
 * Returns array from object
 * @function
 * @param {Object} object
 * @returns {Array} Transformed array from object
 */
export function objectToArray(object) {
    return Object.keys(object).reduce((previous, current) => {
        previous.push({ value: current, title: object[current] });
        return previous;
    }, []);
}

/**
 * Returns array of objects with specified properties in an object
 * @function
 * @param {Object} object
 * @param {string} [valueName = name] - Value name
 * @param {string} [indexName = id] - Index name
 * @returns {Array} Transformed array from object
 */
export function objectToArrayWithPropsName(object, valueName = 'name', indexName = 'id') {
    return Object.keys(object).reduce((previous, current) => {
        const insertObject = {};
        insertObject[indexName] = current;
        insertObject[valueName] = object[current];
        previous.push(insertObject);
        return previous;
    }, []);
}

/**
 * Returns value by key in the object
 * @function
 * @param {Object} object
 * @param {string} key
 * @returns {*} Value for key
 */
export function getValueByKey(object, key) {
    return Object.keys(object).reduce((acc, property) => {
        if (property === key) {
            return object[property];
        }
        return acc;
    }, '');
}

/**
 * Return keys by values in the object
 * @function
 * @param {Object} object
 * @param {Array} values
 * @returns {Array} Keys for values
 */
export function getKeysByValues(object, values) {
    const array = [];
    values.forEach((element) => {
        array.push(getKeyByValue(object, element));
    });
    return array;
}

/**
 * Return values by keys in the object
 * @function
 * @param {Object} object
 * @param {Array} keys
 * @returns {Array} Values for keys
 */
export function getValuesByKeys(object, keys) {
    const values = [];
    keys.forEach((key) => {
        values.push(getValueByKey(object, key));
    });
    return values;
}

/**
 * Returns maximum key value
 * @function
 * @param {Object} object - object keys should be numbers
 * @returns {number} Max value
 */
export function getMaxKeyValue(object) {
    return Math.max(...Object.keys(object)) + 1;
}

/**
 * Check if object
 * @function
 * @param {Object} object
 * @returns {boolean}
 */
export function isObject(object) {
    return typeof object === 'object' && object !== null;
}

/**
 * Check if object is empty
 * @function
 * @param {Object} object
 * @returns {boolean}
 */
export function isEmpty(obj) {
    return isObject(obj)
        ? !(Object.keys(obj).length)
        : true;
}

/**
 * Returns an object without item by key
 * @function
 * @param {Object} object
 * @param {string} keyToRemove
 * @returns {Object} Transformed object
 */
export function removeFromObjectByKey(object, keyToRemove) {
    return Object.keys(object).reduce((item, key) => {
        const itemCopy = item;
        if (key !== keyToRemove) {
            itemCopy[key] = object[key];
        }
        return itemCopy;
    }, {});
}
