/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getObstaclePositionsForElement,
    getHighlightingPositions,
    getHighlightingLayoutDropPositions,
    getMaxColumnForGivenRow,
    getMaxRowForGivenColumn,
    getColumnBasedOnWidth,
    getRowBasedOnHeight,
} from '../LayoutCalculations';

test('Element has correct number of obstacle points', () => {
    const elementBounds = {
        row: 1,
        column: 1,
        width: 1,
        height: 1,
    };

    expect(getObstaclePositionsForElement(elementBounds).length)
        .toEqual(elementBounds.width * elementBounds.height);

    elementBounds.width = 5;
    elementBounds.height = 2;

    expect(getObstaclePositionsForElement(elementBounds).length)
        .toEqual(elementBounds.width * elementBounds.height);

    elementBounds.width = 0;
    elementBounds.height = 0;

    expect(getObstaclePositionsForElement(elementBounds).length)
        .toEqual(elementBounds.width * elementBounds.height);

    elementBounds.width = -1;
    elementBounds.height = -1;

    expect(getObstaclePositionsForElement(elementBounds).length).toEqual(0);
});

test('Element has correct values of obstacle points', () => {
    const elementBounds = {
        row: 1,
        column: 1,
        width: 1,
        height: 1,
    };

    expect(getObstaclePositionsForElement(elementBounds)[0]).toEqual({ row: 1, column: 1 });
});

test('Based on theme elements getting number of elements to highlight', () => {
    const elementPosition = {
        row: 5,
        column: 2,
        maxWidth: 4,
        maxHeight: 4,
    };

    let layoutElements = [
        {
            row: 5,
            column: 2,
            width: 2,
            height: 2,
        },
    ];

    let highlightingPositions = getHighlightingPositions(elementPosition, layoutElements);

    expect(highlightingPositions.length)
        .toEqual(elementPosition.maxWidth * elementPosition.maxHeight);

    layoutElements = [
        {
            row: 5,
            column: 2,
            width: 2,
            height: 2,
        },
        {
            row: 1,
            column: 1,
            width: 1,
            height: 1,
        },
        {
            row: 4,
            column: 5,
            width: 1,
            height: 5,
        },
        {
            row: 8,
            column: 1,
            width: 5,
            height: 1,
        },
    ];

    highlightingPositions = getHighlightingPositions(elementPosition, layoutElements);

    expect(highlightingPositions.length).toEqual(9);

    layoutElements.push({
        row: 6,
        column: 3,
        width: 1,
        height: 1,
    });

    highlightingPositions = getHighlightingPositions(elementPosition, layoutElements);

    expect(highlightingPositions.length).toEqual(5);

    highlightingPositions = getHighlightingPositions(elementPosition, []);

    expect(highlightingPositions.length)
        .toEqual(elementPosition.maxWidth * elementPosition.maxHeight);
});

test('Getting max column (limited by obstacles - first obstacle met at column breaks iteration) for given row', () => {
    const elementPosition = {
        row: 5,
        column: 2,
        maxWidth: 4,
        maxHeight: 4,
    };
    const layoutElements = [
        {
            row: 5,
            column: 2,
            width: 2,
            height: 2,
        },
        {
            row: 1,
            column: 1,
            width: 1,
            height: 1,
        },
        {
            row: 4,
            column: 5,
            width: 1,
            height: 5,
        },
        {
            row: 8,
            column: 1,
            width: 5,
            height: 1,
        },
    ];

    const highlightingPositions = getHighlightingPositions(elementPosition, layoutElements);

    expect(getMaxColumnForGivenRow(3, highlightingPositions)).toEqual(2);
    expect(getMaxColumnForGivenRow(5, highlightingPositions)).toEqual(4);
    expect(getMaxColumnForGivenRow(0, highlightingPositions)).toEqual(2);
    expect(getMaxColumnForGivenRow(10, highlightingPositions)).toEqual(2);
    expect(getMaxColumnForGivenRow(-1, highlightingPositions)).toEqual(2);
    expect(getMaxColumnForGivenRow(null, highlightingPositions)).toEqual(2);
    expect(getMaxColumnForGivenRow(undefined, highlightingPositions)).toEqual(2);
    expect(getMaxColumnForGivenRow(10, [])).toEqual(0);
});

test('Getting max row (limited by obstacles - first obstacle met at row breaks iteration) for given column', () => {
    const elementPosition = {
        row: 5,
        column: 2,
        maxWidth: 4,
        maxHeight: 4,
    };
    const layoutElements = [
        {
            row: 5,
            column: 2,
            width: 2,
            height: 2,
        },
        {
            row: 1,
            column: 1,
            width: 1,
            height: 1,
        },
        {
            row: 4,
            column: 5,
            width: 1,
            height: 5,
        },
        {
            row: 8,
            column: 1,
            width: 5,
            height: 1,
        },
    ];

    const highlightingPositions = getHighlightingPositions(elementPosition, layoutElements);

    expect(getMaxRowForGivenColumn(3, highlightingPositions)).toEqual(7);
    expect(getMaxRowForGivenColumn(5, highlightingPositions)).toEqual(5);
    expect(getMaxRowForGivenColumn(0, highlightingPositions)).toEqual(5);
    expect(getMaxRowForGivenColumn(10, highlightingPositions)).toEqual(5);
    expect(getMaxRowForGivenColumn(-1, highlightingPositions)).toEqual(5);
    expect(getMaxRowForGivenColumn(null, highlightingPositions)).toEqual(5);
    expect(getMaxRowForGivenColumn(undefined, highlightingPositions)).toEqual(5);
    expect(getMaxRowForGivenColumn(10, [])).toEqual(0);
});

test('Getting normalized column', () => {
    const normalizedColumn = getColumnBasedOnWidth(100, 50, 2);

    expect(normalizedColumn).toEqual(3);
});

test('Getting normalized row', () => {
    const normalizedRow = getRowBasedOnHeight(100, 50, 2);

    expect(normalizedRow).toEqual(3);
});

test('Based on non theme elements getting highlighting positions where we can drop element', () => {
    describe('Zero theme elements', () => {
        const layoutElements = [];
        const highlightingPositions = getHighlightingLayoutDropPositions({
            draggedElWidth: 2,
            draggedElHeight: 2,
            layoutWidth: 4,
            layoutHeight: 5,
            layoutElements,
        });

        expect(highlightingPositions.length).toEqual(20);
    });

    describe('Many theme elements', () => {
        const layoutElements = [
            {
                row: 3,
                column: 2,
                width: 2,
                height: 1,
            },
            {
                row: 3,
                column: 4,
                width: 1,
                height: 3,
            },
            {
                row: 4,
                column: 1,
                width: 1,
                height: 2,
            },
        ];

        const highlightingPositions = getHighlightingLayoutDropPositions({
            draggedElWidth: 2,
            draggedElHeight: 2,
            layoutWidth: 4,
            layoutHeight: 5,
            layoutElements,
        });

        expect(highlightingPositions.length).toEqual(12);
    });
});
