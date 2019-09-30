/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getObjectWithMaxValueInArrayByObjectKey(array, propName) {
    if (!array.length) return null;

    return array.reduce(
        (prev, current) => {
            if (!current || !current[propName]) return prev;
            return (prev[propName] > current[propName] ? prev : current);
        },
    );
}

export function swapItemPosition(array, pos1, pos2) {
    const tmpArray = array;
    // local variables
    let i;
    let tmp;
    // if positions are different and inside array
    if (pos1 !== pos2
        && pos1 >= 0
        && pos1 <= tmpArray.length
        && pos2 >= 0
        && pos2 <= tmpArray.length) {
        // save element from position 1
        tmp = tmpArray[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i += 1) {
                tmpArray[i] = tmpArray[i + 1];
            }
        } else { // move element up and shift other elements down
            for (i = pos1; i > pos2; i -= 1) {
                tmpArray[i] = tmpArray[i - 1];
            }
        }
        // put element from position 1 to destination
        tmpArray[pos2] = tmp;
    }

    return tmpArray;
}

export function isArrayEqualToArray(arr1, arr2) {
    const { length: arr1Length } = arr1;
    const { length: arr2Length } = arr2;

    if (arr1Length !== arr2Length) return false;

    let isEqual = true;

    for (let i = 0; i < arr1Length; i += 1) {
        if (arr2.indexOf(arr1[i]) === -1) {
            isEqual = false;
        }
    }

    return isEqual;
}

export function insertValueAtIndex(array, value, index) {
    return [
        ...array.slice(0, index),
        value,
        ...array.slice(index),
    ];
}

export function removeValueAtIndex(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function sumIntegers(arr) {
    if (!Array.isArray(arr)) return 0;

    const { length } = arr;
    let value = 0;

    for (let i = 0; i < length; i += 1) {
        if (Number.isInteger(arr[i])) value += arr[i];
    }

    return value;
}

export function arrayToObject(array, keyField, value) {
    return array.reduce((prev, current) => {
        const newObject = prev;
        newObject[current[keyField]] = current[value];
        return newObject;
    }, {});
}
