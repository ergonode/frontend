/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function arrayToObject(arr, keyField = 'id') {
    return { ...arr.map(item => ({ [keyField]: item })) };
}

export function sumArray(arr) {
    return arr.reduce((a, b) => a + b, 0);
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
