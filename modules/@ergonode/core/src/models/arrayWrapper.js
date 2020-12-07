/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/**
 * Returns object with max value in array by object key
 * @function
 * @param {Array} array
 * @param {string} propName
 * @returns {Object}
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

/**
 * Returns swap item position
 * @function
 * @param {Array} array
 * @param {number} pos1
 * @param {number} pos2
 * @returns {Array}
 */
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

/**
 * Returns filtered array by given criteria
 * @param array
 * @param filterValue
 * @param keys
 * @param condition
 * @returns {Array}
 */
export function simpleSearch(
    array = [],
    filterValue = '',
    keys = [],
    condition = (
        lowerCaseFilterValue,
        searchValue,
    ) => lowerCaseFilterValue.some(value => value.includes(searchValue)),
) {
    const isArray = Array.isArray(filterValue);

    if (filterValue === '' || (isArray && filterValue.length === 0)) {
        return array;
    }

    const lowerCaseFilterValue = isArray
        ? filterValue.map(value => value.toLowerCase())
        : [
            filterValue.toLowerCase(),
        ];

    return array.filter(node => keys.some((key) => {
        if (typeof node[key] !== 'undefined' && node[key] !== null && node[key] !== '') {
            const objectValue = String(node[key]).toLowerCase();

            return condition(lowerCaseFilterValue, objectValue);
        }

        return false;
    }));
}

/**
 * Returns filtered tree structure by given criteria
 * @param array
 * @param filterValue
 * @param keys
 * @param condition
 * @returns {Array}
 */
export function dfsSearch(
    array = [],
    filterValue = '',
    keys = [],
    condition = (
        lowerCaseFilterValue,
        searchValue,
    ) => lowerCaseFilterValue.some(value => value.includes(searchValue)),
) {
    const isArray = Array.isArray(filterValue);

    if (filterValue === '' || (isArray && filterValue.length === 0)) {
        return array;
    }

    const currentPath = [];
    const lowerCaseFilterValue = isArray
        ? filterValue.map(value => value.toLowerCase())
        : [
            filterValue.toLowerCase(),
        ];

    const depthFirstTraversal = (root, callback) => {
        currentPath.push(root);

        if (root.children) {
            for (let i = 0; i < root.children.length; i += 1) {
                depthFirstTraversal(root.children[i], callback);
            }
        }

        callback(root, currentPath);

        currentPath.pop();
    };

    const copyNode = (node) => {
        const n = {
            ...node,
        };

        if (n.children) { n.children = []; }

        return n;
    };

    const lookAtKeyedValues = (node, callback) => {
        keys.forEach((key) => {
            if (typeof node[key] !== 'undefined' && node[key] !== null && node[key] !== '') {
                const objectValue = String(node[key]).toLowerCase();

                if (condition(lowerCaseFilterValue, objectValue)) {
                    callback();
                }
            }
        });
    };

    const filterTree = (root) => {
        // eslint-disable-next-line no-param-reassign
        root.copied = copyNode(root);
        const filteredResult = root.copied;

        depthFirstTraversal(root, (node, branch) => {
            lookAtKeyedValues(node, () => {
                for (let i = 0, len = branch.length; i < len; i += 1) {
                    if (!branch[i].copied) {
                        // eslint-disable-next-line no-param-reassign
                        branch[i].copied = copyNode(branch[i]);
                        branch[i - 1].copied.children.push(branch[i].copied);
                    }
                }
            });
        });

        depthFirstTraversal(root, (node) => {
            // eslint-disable-next-line no-param-reassign
            delete node.copied;
        });

        if ((filteredResult.children && !filteredResult.children.length)
            || typeof filteredResult.children === 'undefined') {
            let result = null;

            lookAtKeyedValues(filteredResult, () => {
                result = filteredResult;
            });

            return result;
        }

        return filteredResult;
    };

    function searchForMultipleRoots(list) {
        const filteredList = [];

        for (let i = 0; i < list.length; i += 1) {
            const filteredTree = filterTree(list[i]);

            if (filteredTree) {
                filteredList.push(filteredTree);
            }
        }

        return filteredList;
    }

    return searchForMultipleRoots(array);
}

/**
 * Check if arrays are equal
 * @function
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */
export function arraysAreEqual(arr1, arr2) {
    const {
        length: arr1Length,
    } = arr1;
    const {
        length: arr2Length,
    } = arr2;

    if (arr1Length !== arr2Length) return false;

    let isEqual = true;

    for (let i = 0; i < arr1Length; i += 1) {
        if (arr2.indexOf(arr1[i]) === -1) {
            isEqual = false;
        }
    }

    return isEqual;
}

/**
 * Returns an array with new value at index
 * @function
 * @param {Array} array
 * @param {*} value
 * @param {number} index
 * @returns {number} Transformed array
 */
export function insertValueAtIndex(array, value, index) {
    return [
        ...array.slice(0, index),
        value,
        ...array.slice(index),
    ];
}

/**
 * Returns an array without value at index
 * @function
 * @param {Array} array
 * @param {number} index
 * @returns {number} Transformed array
 */
export function removeValueAtIndex(array, index) {
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1),
    ];
}

/**
 * Returns sum of integers
 * @function
 * @param {Array} array
 * @returns {number} Sum
 */
export function sumIntegers(array) {
    if (!Array.isArray(array)) return 0;

    const {
        length,
    } = array;
    let value = 0;

    for (let i = 0; i < length; i += 1) {
        if (Number.isInteger(array[i])) value += array[i];
    }

    return value;
}

/**
 * Returns object from array with objects
 * @function
 * @param {Array} array
 * @param {string} keyField
 * @param {string} value
 * @returns {Object} Flat object
 */
export function arrayToObject(array, keyField, value) {
    return array.reduce((prev, current) => {
        const newObject = prev;
        newObject[current[keyField]] = current[value];
        return newObject;
    }, {});
}

/**
 * Returns last element on array
 * @function
 * @param {Array} array
 * @returns {*} Last element
 */
export function lastElementInList(array) {
    const arrayLength = array.length;
    return arrayLength > 0 ? array[arrayLength - 1] : null;
}

/**
 * Returns first element on array
 * @function
 * @param {Array} array
 * @returns {*} First element
 */
export function firstElementInList(array) {
    const arrayLength = array.length;
    return arrayLength > 0 ? array[0] : null;
}
