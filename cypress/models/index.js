/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const MultiSteps = (steps, message, callback) => {
    steps.forEach((step) => {
        step(message, callback);
    });
};

export const escapeStringRegexp = (string) => {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }

    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
};
