/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getHighlightingPositions,
    getMaxColumnForGivenRow,
    getMaxRowForGivenColumn,
    getObstaclePositionsForElement,
} from '../TemplateDesignerCalculations';

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

    expect(getObstaclePositionsForElement(elementBounds)[0]).toEqual({
        row: 1,
        column: 1,
    });
});

test('Highlight positions to resize at', () => {
    const elementBounds = {
        row: 5,
        column: 2,
        maxWidth: 4,
        maxHeight: 4,
    };

    let elements = [
        {
            row: 5,
            column: 2,
            width: 2,
            height: 2,
        },
    ];

    const layoutWidth = 4;
    const layoutHeight = 10;

    let highlightingPositions = getHighlightingPositions({
        elementBounds,
        elements,
        layoutWidth,
        layoutHeight,
    });

    expect(highlightingPositions.length)
        .toEqual(elementBounds.column * elementBounds.maxHeight);

    elements = [
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
            column: 3,
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

    highlightingPositions = getHighlightingPositions({
        elementBounds,
        elements,
        layoutWidth,
        layoutHeight,
    });

    expect(highlightingPositions.length).toEqual(9);

    elements.push({
        row: 6,
        column: 3,
        width: 1,
        height: 1,
    });

    highlightingPositions = getHighlightingPositions({
        elementBounds,
        elements,
        layoutWidth,
        layoutHeight,
    });

    expect(highlightingPositions.length).toEqual(5);

    highlightingPositions = getHighlightingPositions({
        elementBounds,
        elements: [],
        layoutWidth,
        layoutHeight,
    });

    expect(highlightingPositions.length)
        .toEqual(elementBounds.maxWidth * elementBounds.maxHeight);
});

test('Getting max column (limited by obstacles - first obstacle met at column breaks iteration) for given row', () => {
    const elementBounds = {
        row: 5,
        column: 2,
        maxWidth: 4,
        maxHeight: 4,
    };
    const elements = [
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

    const layoutWidth = 4;
    const layoutHeight = 10;

    const highlightingPositions = getHighlightingPositions({
        elementBounds,
        elements,
        layoutWidth,
        layoutHeight,
    });

    expect(getMaxColumnForGivenRow(3, highlightingPositions, layoutWidth)).toEqual(2);
    expect(getMaxColumnForGivenRow(5, highlightingPositions, layoutWidth)).toEqual(4);
    expect(getMaxColumnForGivenRow(0, highlightingPositions, layoutWidth)).toEqual(2);
    expect(getMaxColumnForGivenRow(10, highlightingPositions, layoutWidth)).toEqual(2);
    expect(getMaxColumnForGivenRow(-1, highlightingPositions, layoutWidth)).toEqual(2);
    expect(getMaxColumnForGivenRow(null, highlightingPositions, layoutWidth)).toEqual(2);
    expect(getMaxColumnForGivenRow(undefined, highlightingPositions, layoutWidth)).toEqual(2);
    expect(getMaxColumnForGivenRow(10, [], layoutWidth)).toEqual(0);
});

test('Getting max row (limited by obstacles - first obstacle met at row breaks iteration) for given column', () => {
    const elementBounds = {
        row: 5,
        column: 2,
        maxWidth: 4,
        maxHeight: 4,
    };
    const elements = [
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

    const layoutHeight = 10;
    const layoutWidth = 4;

    const highlightingPositions = getHighlightingPositions({
        elementBounds,
        elements,
        layoutWidth,
        layoutHeight,
    });

    expect(getMaxRowForGivenColumn(3, highlightingPositions, layoutHeight)).toEqual(7);
    expect(getMaxRowForGivenColumn(5, highlightingPositions, layoutHeight)).toEqual(5);
    expect(getMaxRowForGivenColumn(0, highlightingPositions, layoutHeight)).toEqual(5);
    expect(getMaxRowForGivenColumn(10, highlightingPositions, layoutHeight)).toEqual(5);
    expect(getMaxRowForGivenColumn(-1, highlightingPositions, layoutHeight)).toEqual(5);
    expect(getMaxRowForGivenColumn(null, highlightingPositions, layoutHeight)).toEqual(5);
    expect(getMaxRowForGivenColumn(undefined, highlightingPositions, layoutHeight)).toEqual(5);
    expect(getMaxRowForGivenColumn(10, [], layoutHeight)).toEqual(0);
});
