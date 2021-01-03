/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

// Helpers
const paddingGap = 16;
const isObstacle = (obstacles, x, y) => obstacles.some(
    obstacle => obstacle.row === y && obstacle.column === x,
);
const isObstacleInRangeOf = (obstacles, x, y, xRange, yRange) => obstacles.some((obstacle) => {
    const {
        row, column,
    } = obstacle;

    return row >= y && row <= yRange && column >= x && column <= xRange;
});
const fillHighlightingPositions = (highlightingPositions, x, y, xRange, yRange) => {
    let column = x;
    while (column <= xRange) {
        let row = y;

        while (row <= yRange) {
            highlightingPositions.add(`${row}|${column}`);
            row += 1;
        }
        column += 1;
    }
};
const positionsSetToArray = (set) => {
    const array = [];

    set.forEach((position) => {
        const [
            row,
            column,
        ] = position.split('|');
        array.push({
            row: +row,
            column: +column,
        });
    });

    return array;
};
const addObstaclesToHighlightingPositions = ({
    positions, obstacles, draggedElWidth, draggedElHeight, layoutWidth, layoutHeight,
}) => {
    const {
        length: obstaclesLength,
    } = obstacles;
    const tmpPositions = [
        ...positions,
    ];

    for (let i = 0; i < obstaclesLength; i += 1) {
        const {
            row, column,
        } = obstacles[i];

        for (let x = column - draggedElWidth + 1; x <= column; x += 1) {
            for (let y = row - draggedElHeight + 1; y <= row; y += 1) {
                const posIndex = positions.findIndex(
                    position => position.row === y && position.column === x,
                );

                if (posIndex > -1) {
                    tmpPositions[posIndex].isObstacle = true;
                }
            }
        }
    }

    const {
        length: positionsLength,
    } = tmpPositions;

    for (let i = 0; i < positionsLength; i += 1) {
        const {
            row, column,
        } = tmpPositions[i];
        const isOutOfBoundsWithWidth = column + draggedElWidth - 1 > layoutWidth;
        const isOutOfBoundsWithHeight = row + draggedElHeight - 1 > layoutHeight;

        if (isOutOfBoundsWithWidth || isOutOfBoundsWithHeight) {
            tmpPositions[i].isObstacle = true;
        }
    }

    return tmpPositions;
};

// When element is in resizing mode,
// we need to determinate which area is going to be marked as obstacle or not
export function getObstaclePositionsForElement({
    row,
    column,
    width,
    height,
}) {
    if (width < 0 || height < 0) {
        return [];
    }

    const obstaclePositions = [];

    for (let y = row; y < row + height; y += 1) {
        let x = column;

        while (x < column + width) {
            obstaclePositions.push({
                row: y,
                column: x,
            });
            x += 1;
        }
    }

    return obstaclePositions;
}

export function getHighlightingLayoutDropPositions({
    draggedElWidth,
    draggedElHeight,
    layoutWidth,
    layoutHeight,
    layoutElements,
}) {
    console.log('Layout size: ', '[', layoutWidth, layoutHeight, ']');

    const {
        length,
    } = layoutElements;
    let layoutObstaclePositions = [];

    for (let i = 0; i < length; i += 1) {
        const elementObstaclePositions = getObstaclePositionsForElement(layoutElements[i]);

        layoutObstaclePositions = [
            ...layoutObstaclePositions,
            ...elementObstaclePositions,
        ];
    }

    const highlightingPositions = new Set();

    for (let x = 0; x < layoutWidth; x += 1) {
        for (let y = 0; y < layoutHeight; y += 1) {
            const xRange = x - 1 + draggedElWidth;
            const yRange = y - 1 + draggedElHeight;

            console.log('xRange:', xRange, 'yRange', yRange);

            const isOutOfBounds = (xRange > layoutWidth || yRange > layoutHeight);

            if (!isOutOfBounds
                && !isObstacleInRangeOf(layoutObstaclePositions, x, y, xRange, yRange)) {
                fillHighlightingPositions(
                    highlightingPositions,
                    x,
                    y,
                    xRange,
                    yRange,
                );
            }
        }
    }

    return addObstaclesToHighlightingPositions({
        positions: positionsSetToArray(highlightingPositions),
        obstacles: layoutObstaclePositions,
        draggedElWidth,
        draggedElHeight,
        layoutWidth,
        layoutHeight,
    });
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
                const {
                    row: pRow, column: pColumn,
                } = point;
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
                highlightingPositions.push({
                    row: y,
                    column: x,
                });
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
