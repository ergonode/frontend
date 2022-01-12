/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    getMappedLayoutElements,
    getMappedRowPositions,
    getMappedStatusPositions,
    getMappedTransitions,
    getObstacleColumns,
    getRows,
    getValidColumnsToAddTransition,
} from '@Workflow/models/workflowDesigner';
import {
    extendedLayoutElements,
    extendedStatuses,
    layoutElements,
    obstacleColumns,
    statuses,
    transitions,
    transitionsToSend,
    validColumns,
    validRow,
    validRowPositions,
} from '@Workflow/models/workflowDesigner/__tests__/__mocks__';

// Considering designer example
//     0   1   2   3
//    ---------------
// 1 | x |   | x |   | => From 0 to 2
//    ---------------
// 2 | x |   |   | x | => From 0 to 3
//    ---------------
// 3 | x | x |   |   | => From 0 to 1
//    ---------------
// 4 | x |   |   |   |
//    ---------------

describe('getObstacleColumns', () => {
    it('Based on designer without transitions get all obstacles for given row', () => {
        const result = getObstacleColumns({
            from: 3,
            transitions: [],
        });

        expect(result.length).toEqual(1);
    });

    it('Based on designer with transitions get the all obstacles for new transition starting at column 1 and row 4', () => {
        const result = getObstacleColumns({
            from: 0,
            transitions: layoutElements,
        });

        expect(result.length).toEqual(4);
        expect(result).toEqual(obstacleColumns);
    });
});

describe('getValidColumnsToAddTransition', () => {
    it('Based on designer without transitions get all valid columns', () => {
        const result = getValidColumnsToAddTransition({
            columnsNumber: 4,
            obstacleColumns: [],
        });

        expect(result.length).toEqual(4);
        expect(result).toEqual(validColumns);
    });

    it('Based on designer with transitions there is no place to add transition from status at column 1', () => {
        const result = getValidColumnsToAddTransition({
            columnsNumber: 4,
            obstacleColumns,
        });

        expect(result.length).toEqual(0);
    });
});

describe('getMappedRowPositions', () => {
    it('Based on designer transitions get all valid row positions', () => {
        const result = getMappedRowPositions(layoutElements);

        expect(Object.keys(result).length).toEqual(3);
        expect(result).toEqual(validRowPositions);
    });

    it('Based on empty designer transitions get empty row position', () => {
        const result = getMappedRowPositions([]);

        expect(Object.keys(result).length).toEqual(0);
        expect(result).toEqual({});
    });
});

describe('getRows', () => {
    it('Based on designer transitions get all valid row', () => {
        const result = getRows(layoutElements);

        expect(result.length).toEqual(3);
        expect(result).toEqual(validRow);
    });

    it('Based on empty designer transitions get empty row', () => {
        const result = getRows([]);

        expect(result.length).toEqual(0);
        expect(result).toEqual([]);
    });
});

describe('getMappedLayoutElements', () => {
    it('Based on transitions get layout element', () => {
        const result = getMappedLayoutElements({
            transitions,
            statuses,
            rowsPositions: null,
        });

        expect(result.length).toEqual(3);
        expect(result).toEqual(layoutElements);
    });
    it('Based on transitions get empty layout element', () => {
        const result = getMappedLayoutElements({
            transitions: [],
            statuses,
            rowsPositions: null,
        });

        expect(result.length).toEqual(0);
        expect(result).toEqual([]);
    });
});

describe('getMappedTransitions', () => {
    it('Based on layout element get transition to send', () => {
        const result = getMappedTransitions(transitions);

        expect(result.length).toEqual(3);
        expect(result).toEqual(transitionsToSend);
    });
});

describe('getMappedStatusPositions', () => {
    it('Based on layout element and status get empty layout element', () => {
        const result = getMappedStatusPositions({
            layoutElements: [],
            statuses,
        });

        expect(result.length).toEqual(0);
        expect(result).toEqual([]);
    });

    it('Based on layout element and status get that same item positions', () => {
        const result = getMappedStatusPositions({
            layoutElements,
            statuses,
        });

        expect(result.length).toEqual(3);
        expect(result).toEqual(layoutElements);
    });

    it('Based on layout element and status get deferent item positions', () => {
        const result = getMappedStatusPositions({
            layoutElements,
            statuses: extendedStatuses,
        });

        expect(result.length).toEqual(3);
        expect(result).toEqual(extendedLayoutElements);
    });
});
