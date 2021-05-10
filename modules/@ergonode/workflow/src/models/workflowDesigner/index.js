/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getObstacleColumns({
    from,
    transitions,
}) {
    const columns = new Set();
    columns.add(from);

    transitions.forEach((transition) => {
        if (transition.from === from) {
            columns.add(transition.from);
            columns.add(transition.to);
        }
    });

    return Array.from(columns);
}

export function getValidColumnsToAddTransition({
    columnsNumber,
    obstacleColumns,
}) {
    const validPositions = [];

    for (let i = 1; i <= columnsNumber; i += 1) {
        if (!obstacleColumns.some(obstacleColumn => obstacleColumn === i)) {
            validPositions.push(i);
        }
    }

    return validPositions;
}
