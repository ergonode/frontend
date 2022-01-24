/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getFromAndToTransition(id) {
    return id.split('--');
}

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
    let rowValues = rowsPositions;
    if (rowsPositions && Object.keys(rowsPositions).length !== transitions.length) {
        rowValues = null;
    }

    return transitions.reduce((prev, current, index) => {
        const transitionId = `${current.from}--${current.to}`;
        const from = statuses.findIndex(status => status.id === current.from);
        const to = statuses.findIndex(status => status.id === current.to);

        return [
            ...prev,
            {
                id: transitionId,
                from,
                to,
                row: rowValues ? rowValues[transitionId] : index,
            },
        ];
    }, []);
}

export function getMappedStatusPositions({
    layoutElements, statuses,
}) {
    return layoutElements.reduce((prev, current) => {
        const [
            from,
            to,
        ] = getFromAndToTransition(current.id);
        const fromTransition = statuses.findIndex(status => status.id === from);
        const toTransition = statuses.findIndex(status => status.id === to);

        return [
            ...prev,
            {
                ...current,
                from: fromTransition,
                to: toTransition,
            },
        ];
    }, []);
}

export function getMappedRowPositions(layoutElements) {
    return layoutElements.reduce((acc, current) => ({
        ...acc,
        [current.id]: current.row,
    }), {});
}

export function getRows(layoutElements) {
    return layoutElements.map(element => element.row);
}

export function getMappedTransitions(transitions) {
    return transitions.map(transition => ({
        from: transition.from,
        to: transition.to,
        roles: transition.roles,
    }));
}
