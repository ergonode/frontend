/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getMappedPrivileges(privileges) {
    const { length } = privileges;
    const mappedPrivileges = {};

    for (let i = 0; i < length; i += 1) {
        mappedPrivileges[privileges[i]] = true;
    }

    return mappedPrivileges;
}
