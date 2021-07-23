/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
 * Converting string to camelCaseString
 * @param string
 * @returns camelCaseString
 */
export function toCamelCase(string) {
    return string.replace(/^([A-Z])|\s(\w)/g, (match, p1, p2) => {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

/**
 * Returns the string with first lower letter
 * @function
 * @param {string} string
 * @returns {string} String with first lower letter
 * @description Add any string you like
 */
export function toLowerCaseFirstLetter(string) {
    if (!string) return '';

    return `${string.charAt(0).toLocaleLowerCase()}${string.substring(1)}`;
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
        string += `${s.charAt(0).toUpperCase()}${s.substring(1).toLowerCase()}`;
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
    if (bytes === '0' || !bytes) return '0 Bytes';

    const k = 1024;
    const dm = Math.max(0, decimals);
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

/**
 * Based at given text generating slots
 * @param text
 * @param character
 * @returns {[]}
 */
export function getSlots(text, character = '"') {
    const slots = [];

    let startQuote = false;
    let word = '';

    for (let i = 0; i < text.length; i += 1) {
        const char = text[i];

        if (char === character) {
            startQuote = !startQuote;
        } else if (startQuote) {
            word += char;
        }

        if (!startQuote && word !== '') {
            slots.push({
                name: getUUID(),
                text: word,
            });

            word = '';
        }
    }

    return slots;
}
