/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getParent({
    items,
    row,
    column,
}) {
    if (!items.length || column === 0) {
        return {
            id: null,
            row,
            column,
        };
    }

    for (let i = row - 1; i >= 0; i -= 1) {
        if (items[i].column < column) {
            return items[i];
        }
    }

    return items[0];
}
