/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getSourceAndDestination(id) {
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
    if (rowsPositions && rowsPositions.length !== transitions.length) {
        rowValues = null;
    }

    return transitions.reduce((prev, current, index) => {
        const transitionId = `${current.source}--${current.destination}`;
        const from = statuses.findIndex(status => status.id === current.source);
        const to = statuses.findIndex(status => status.id === current.destination);

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
            source,
            destination,
        ] = getSourceAndDestination(current.id);
        const from = statuses.findIndex(status => status.id === source);
        const to = statuses.findIndex(status => status.id === destination);

        return [
            ...prev,
            {
                ...current,
                from,
                to,
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
        source: transition.source,
        destination: transition.destination,
        roles: transition.roles,
        condition_set: transition.condition_set_id,
    }));
}
