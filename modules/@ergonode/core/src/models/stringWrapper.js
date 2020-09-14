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

/**
 * Returns formatted bytes string
 * @function
 * @param {string} bytes
 * @param {number} decimal places
 * @returns {string} formatted bytes string
 */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === '0') return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB',
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
