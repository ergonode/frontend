/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export function getObjectByKey(object, value) {
    return Object.keys(object).reduce((response, property) => {
        if (property === value) {
            return { value: property, title: object[property] };
        }
        return { ...response };
    }, {});
}

export function objectToArray(object) {
    return Object.keys(object).reduce((previous, current) => {
        previous.push({ value: current, title: object[current] });
        return previous;
    }, []);
}

export function getValueByKey(object, value) {
    return Object.keys(object).reduce((response, property) => {
        if (property === value) {
            return object[property];
        }
        return response;
    }, '');
}

export function getKeysByValues(object, values) {
    const array = [];
    values.forEach((element) => {
        array.push(getKeyByValue(object, element));
    });
    return array;
}

export function getValuesByKeys(object, values) {
    const array = [];
    values.forEach((element) => {
        array.push(getValueByKey(object, element));
    });
    return array;
}

export function getMaxKeyValue(object) {
    return Math.max(...Object.keys(object)) + 1;
}

export function lastElementInList(array) {
    const arrayLength = array.length;
    return arrayLength > 0 ? array[arrayLength - 1] : null;
}

export function firstElementInList(array) {
    const arrayLength = array.length;
    return arrayLength > 0 ? array[0] : null;
}

export function isEmpty(obj) {
    return !(Object.keys(obj).length);
}

export function removeFromObjectByKey(object, prop) {
    return Object.keys(object).reduce((item, key) => {
        const itemCopy = item;
        if (key !== prop) {
            itemCopy[key] = object[key];
        }
        return itemCopy;
    }, {});
}
