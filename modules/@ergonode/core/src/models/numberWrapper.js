/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

/**
 * Returns random integer within range
 * @function
 * @param {number} min
 * @param {number} max
 * @returns {Array} Random value
 */
export function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}
