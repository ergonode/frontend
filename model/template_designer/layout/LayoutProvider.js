/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

// Private functions

function getPointsBasedOnBounds({
    row, column, width, height,
}) {
    const points = [];

    for (let x = column; x <= width; x += 1) {
        for (let y = row; y <= height; y += 1) {
            points.push({
                row: y,
                column: x,
            });
        }
    }

    return points;
}

function getMaxRowInLayout(layout) {
    return layout.reduce((previous, current) => {
        const { yPos: prevYPos } = previous.coordinates;
        const { yPos: currYPos } = current.coordinates;

        return (prevYPos.end > currYPos.end ? previous : current);
    }).coordinates.yPos.end;
}

// When element is in resizing mode,
// we need to determinate which area is going to be marked as obstacle or not
export function getObstaclePointsForElement({
    row, column, width, height,
}) {
    const obstaclePoints = [];

    for (let y = row; y < row + height; y += 1) {
        let x = column;
        while (x < column + width) {
            obstaclePoints.push({ row: y, column: x });
            x += 1;
        }
    }

    return obstaclePoints;
}

export function getHoveredPoints(bounds) {
    return getPointsBasedOnBounds(bounds);
}

// Determinate max expanding area for element.
// Example: When element is at [1, 1] with start width and height 1x1
// and we want to expand it to 3x3 as it's his max width,
// height we need to get all of the elements within 3x3 area
export function getHighlightingHintPoints({
    row,
    column,
    maxWidth,
    maxHeight,
}, layoutElements) {
    const highlightingPositions = [];
    const maxColumn = column + maxWidth;
    const layoutObstaclePoints = [];
    let maxRowForGivenColumn = row + maxHeight;

    layoutElements.forEach((element) => {
        if (!(element.row === row && element.column === column)) {
            const elementObstaclePoints = getObstaclePointsForElement(element);
            elementObstaclePoints.forEach((point) => {
                const { row: pRow, column: pColumn } = point;
                if (pRow >= row
                    && pRow <= row + maxHeight
                    && pColumn >= column
                    && pColumn <= column + maxWidth) {
                    layoutObstaclePoints.push(point);
                }
            });
        }
    });

    for (let x = column; x < maxColumn; x += 1) {
        for (let y = row; y < maxRowForGivenColumn; y += 1) {
            if (layoutObstaclePoints.find(element => element.row === y && element.column === x)) {
                if (maxRowForGivenColumn > y) {
                    maxRowForGivenColumn = y;
                }
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
export function getMaxColumnForGivenRow(row, highlightingPoints) {
    if (highlightingPoints.length > 0) {
        return highlightingPoints.reduce((max, bounds) => {
            if (bounds.row === row) {
                return bounds.column;
            }
            return max;
        }, highlightingPoints[0].column);
    }
    return 0;
}

// Based on current highlighted area - points;
// Returning max row for given column.
export function getMaxRowForGivenColumn(column, highlightingPoints) {
    if (highlightingPoints.length > 0) {
        return highlightingPoints.reduce((max, bounds) => {
            if (bounds.column === column) {
                return bounds.row;
            }
            return max;
        }, highlightingPoints[0].row);
    }
    return 0;
}

export function getColumnBasedOnWidth(width, elementMinWidth, elementColumn) {
    const paddingGap = 16;
    return Math.floor(width / (elementMinWidth + paddingGap)) + elementColumn;
}

export function getRowBasedOnHeight(height, elementMinHeight, elementRow) {
    const paddingGap = 16;
    return Math.floor(height / (elementMinHeight + paddingGap)) + elementRow;
}

export function isDraggedElementColliding(draggedElementCoordinates, layout) {
    const { xPos, yPos } = draggedElementCoordinates;
    const width = xPos.end - xPos.start;
    const height = yPos.end - yPos.start;
    const maxColumns = 4;
    const maxColumnIndex = maxColumns + 1;
    const maxRow = getMaxRowInLayout(layout);

    // Element is out of bounds with width
    if (xPos.start + width > maxColumnIndex) {
        return true;
    }

    // Element is out of bounds with height
    if (yPos.start + height > maxRow) {
        return true;
    }

    return layout.some((layoutElement) => {
        const { coordinates, isObstacle } = layoutElement;
        const { xPos: xPosElement, yPos: yPosElement } = coordinates;

        const draggedElOverflowObstacle = xPosElement.start >= xPos.start
            && xPosElement.start < xPos.end
            && yPosElement.start >= yPos.start
            && yPosElement.start < yPos.end;

        return draggedElOverflowObstacle && isObstacle;
    });
}

export default {
    getHoveredPoints,
    getHighlightingHintPoints,
    getMaxColumnForGivenRow,
    getMaxRowForGivenColumn,
    getColumnBasedOnWidth,
    getRowBasedOnHeight,
    isDraggedElementColliding,
};
