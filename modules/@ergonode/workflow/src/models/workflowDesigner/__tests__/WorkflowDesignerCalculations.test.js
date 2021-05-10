/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    getObstacleColumns,
    getValidColumnsToAddTransition,
} from '@Workflow/models/workflowDesigner';
import {
    obstacleColumns,
    transitions,
    validColumns,
} from '@Workflow/models/workflowDesigner/__tests__/__mocks__';

// Considering designer example
//     1   2   3   4
//    ---------------
// 1 | x |   | x |   | => From 1 to 3
//    ---------------
// 2 | x |   |   | x | => From 1 to 4
//    ---------------
// 3 | x | x |   |   | => From 1 to 2
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
            from: 1,
            transitions,
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
