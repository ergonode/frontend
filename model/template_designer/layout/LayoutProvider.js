/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

// Helpers
const paddingGap = 16;
const isObstacle = (obstacles, x, y) => obstacles.find(
    obstacle => obstacle.row === y && obstacle.column === x,
);


// When element is in resizing mode,
// we need to determinate which area is going to be marked as obstacle or not
export function getObstaclePositionsForElement({
    row, column, width, height,
}) {
    if (width < 0 || height < 0) return [];

    const obstaclePositions = [];

    for (let y = row; y < row + height; y += 1) {
        let x = column;
        while (x < column + width) {
            obstaclePositions.push({ row: y, column: x });
            x += 1;
        }
    }

    return obstaclePositions;
}

export function getHighlightingLayoutDropPositions({
    draggedElWidth, draggedElHeight, layoutWidth, layoutHeight, layoutElements,
}) {
    const { length } = layoutElements;
    let layoutObstaclePositions = [];

    for (let i = 0; i < length; i += 1) {
        const elementObstaclePositions = getObstaclePositionsForElement(layoutElements[i]);

        layoutObstaclePositions = [...layoutObstaclePositions, ...elementObstaclePositions];
    }

    let width = 0;

    const highlightingPositions = [];

    for (let x = 0; x < layoutWidth; x += 1, width += 1) {
        let height = 0;

        for (let y = 0; y < layoutHeight; y += 1) {
            if (!isObstacle(layoutObstaclePositions, x, y)) {
                height += 1;

                if (width >= draggedElWidth && height >= draggedElHeight) {
                    // Max
                    highlightingPositions.push({ column: x, row: y });
                }
            } else {
                width = 0;
                break;
            }
        }
    }
}

// Determinate max expanding area for element.
// Example: When element is at [1, 1] with start width and height 1x1
// and we want to expand it to 3x3 as it's his max width,
// height we need to get all of the elements within 3x3 area
export function getHighlightingPositions({
    row,
    column,
    maxWidth,
    maxHeight,
}, layoutElements) {
    const highlightingPositions = [];
    const maxColumn = column + maxWidth;
    const layoutObstaclePositions = [];
    let maxRowForGivenColumn = row + maxHeight;

    layoutElements.forEach((element) => {
        if (!(element.row === row && element.column === column)) {
            const elementObstaclePositions = getObstaclePositionsForElement(element);
            elementObstaclePositions.forEach((point) => {
                const { row: pRow, column: pColumn } = point;
                if (pRow >= row
                    && pRow <= row + maxHeight
                    && pColumn >= column
                    && pColumn <= column + maxWidth) {
                    layoutObstaclePositions.push(point);
                }
            });
        }
    });

    for (let x = column; x < maxColumn; x += 1) {
        for (let y = row; y < maxRowForGivenColumn; y += 1) {
            if (isObstacle(layoutObstaclePositions, x, y)) {
                maxRowForGivenColumn = y;
            }

            if (y < maxRowForGivenColumn) {
                highlightingPositions.push({ row: y, column: x });
            }
        }
    }

    return highlightingPositions;
}

// Based on current highlighted area - points;
// Returning max column for given row.
export function getMaxColumnForGivenRow(row, highlightingPositions) {
    if (highlightingPositions.length > 0) {
        return highlightingPositions.reduce((max, bounds) => {
            if (bounds.row === row) {
                return bounds.column;
            }
            return max;
        }, highlightingPositions[0].column);
    }
    return 0;
}

// Based on current highlighted area - points;
// Returning max row for given column.
export function getMaxRowForGivenColumn(column, highlightingPositions) {
    if (highlightingPositions.length > 0) {
        return highlightingPositions.reduce((max, bounds) => {
            if (bounds.column === column) {
                return bounds.row;
            }
            return max;
        }, highlightingPositions[0].row);
    }
    return 0;
}

export function getColumnBasedOnWidth(width, elementMinWidth, elementColumn) {
    return Math.floor(width / (elementMinWidth + paddingGap)) + elementColumn;
}

export function getRowBasedOnHeight(height, elementMinHeight, elementRow) {
    return Math.floor(height / (elementMinHeight + paddingGap)) + elementRow;
}
