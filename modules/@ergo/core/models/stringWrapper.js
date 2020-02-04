/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/** @module stringWrapper */

/**
 * Returns the string with first capital letter
 * @function
 * @param {string} string
 * @returns {string} String with first capital letter
 * @description Add any string you like
 */
export function toCapitalize(string) {
    if (!string) return '';

    return string.replace(
        /^\w/, c => c.toUpperCase(),
    );
}

/**
 * Returns the string composed of array elements with first capital letter
 * @function
 * @param {array} strings
 * @returns {string} Uppercase letters
 * @description Add strings array
 */
export function capitalizeAndConcatenationArray(strings) {
    let string = '';
    strings.forEach((s) => {
        const lowerCasedString = s.toLowerCase();
        const capitalizedString = toCapitalize(lowerCasedString);
        string += capitalizedString;
    });

    return string;
}

/**
 * Returns uniq string
 * @function
 * @returns {string} Uniq string
 */
export function getUUID() {
    return Math.random().toString(36).substr(2, 9);
}
