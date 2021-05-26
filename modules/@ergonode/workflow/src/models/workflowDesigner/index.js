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
    const allPositions = Array.from(Array(columnsNumber).keys());

    return allPositions.filter(position => !obstacleColumns.includes(position));
}

export function getMappedLayoutElements({
    transitions,
    statuses,
    rowsPositions,
}) {
    return transitions.reduce((acc, current, index) => {
        const tmpArray = acc;
        const transitionId = `${current.source}--${current.destination}`;
        const from = statuses.findIndex(status => status.id === current.source);
        const to = statuses.findIndex(status => status.id === current.destination);

        tmpArray.push({
            id: transitionId,
            from,
            to,
            row: rowsPositions ? rowsPositions[transitionId] : index,
        });

        return tmpArray;
    }, []);
}

export function getMappedRowPositions(layoutElements) {
    return layoutElements.reduce((acc, current) => ({
        ...acc,
        [current.id]: current.row,
    }), {});
}

export function getExcludeRows(layoutElements) {
    return layoutElements.reduce((acc, current) => [
        ...acc,
        current.row,
    ], []);
}
