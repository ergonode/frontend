/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ElementBounds from '~/model/coordinate_system/ElementBounds';
import Coordinates from '~/model/coordinate_system/Coordinates';
import Point from '~/model/coordinate_system/Point';
import * as coordinatesHelper from '~/model/coordinate_system/CoordinatesHelper';
import { isSmallerThan } from '~/model/numberOperations';

// Private functions

function getPointsBasedOnBounds(bounds) {
    const {
        x, y, width, height,
    } = bounds;
    const points = [];

    for (let i = 0; i < height; i += 1) {
        for (let j = 0; j < width; j += 1) {
            points.push(
                new Point(
                    x + j,
                    y + i * 2,
                ),
            );
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
export function getObstaclePointsForBaseCoordinates(baseCoordinates) {
    const { xPos, yPos } = baseCoordinates;
    const obstaclePoints = [];

    for (let y = yPos.start; y < yPos.end; y += 1) {
        let x = xPos.start;
        while (x < xPos.end) {
            let point;
            if (y % 2 === 1) {
                point = new Point(1, y);
                // Section is expanded for full width
                x = xPos.end;
            } else {
                point = new Point(x, y);
                x += 1;
            }
            obstaclePoints.push(point);
        }
    }

    return obstaclePoints;
}

export function getHoveredPoints(baseCoordinates, width, height) {
    const { xPos, yPos } = baseCoordinates;

    return getPointsBasedOnBounds(
        new ElementBounds(
            xPos.start,
            yPos.start,
            width,
            height,
        ),
    );
}

// Determinate max expanding area for element.
// Example: When element is at [1, 1] with start width and height 1x1
// and we want to expand it to 3x3 as it's his max width,
// height we need to get all of the elements within 3x3 area
export function getHighlightingHintPoints(baseCoordinates, maxWidth, maxHeight, layout) {
    const boundingCoordinates = new Coordinates(
        baseCoordinates.xPos.start,
        baseCoordinates.xPos.start + maxWidth,
        baseCoordinates.yPos.start,
        baseCoordinates.yPos.start + maxHeight,
    );
    const highlightingPoints = [];

    let maxColumnForGivenObstacleRow = null;

    layout.some((layoutElement) => {
        const { coordinates } = layoutElement;
        const { xPos, yPos } = coordinates;
        const elementIsInHighlightingArea = coordinatesHelper.coordinatesAreBetween(
            coordinates,
            boundingCoordinates,
        );

        if (elementIsInHighlightingArea) {
            const columnIsNotObstacle = isSmallerThan(
                xPos.start,
                maxColumnForGivenObstacleRow,
            );

            if (maxColumnForGivenObstacleRow === null
                || columnIsNotObstacle) {
                if (layoutElement.isObstacle) {
                    // Right! We've met an obstacle object,
                    // let's mark it as max column for given row
                    maxColumnForGivenObstacleRow = xPos.start;
                } else {
                    // Non obstacle element -> add to layout
                    highlightingPoints.push(
                        new Point(
                            xPos.start,
                            yPos.start,
                        ),
                    );
                }

                // Section breaks iteration - collision with section
                return layoutElement.label;
            }
            return false;
        }
        return false;
    });


    // Remove first point - We do not need to highlight it - it is an attribute element.
    highlightingPoints.shift();

    return highlightingPoints;
}

// Based on current highlighted area - points;
// Returning max column for given row.
export function getMaxColumnForGivenRow(row, highlightingPoints) {
    if (highlightingPoints.length > 0) {
        return highlightingPoints.reduce((max, bounds) => {
            if (bounds.y === row) {
                return bounds.x;
            }
            return max;
        }, highlightingPoints[0].x);
    }
    return 0;
}

// Based on current highlighted area - points;
// Returning max row for given column.
export function getMaxRowForGivenColumn(column, highlightingPoints) {
    if (highlightingPoints.length > 0) {
        return highlightingPoints.reduce((max, bounds) => {
            if (bounds.x === column) {
                return bounds.y;
            }
            return max;
        }, highlightingPoints[0].y);
    }
    return 0;
}

export function getColumnBasedOnWidth(width, elementMinWidth, xPos) {
    const widthOfColumnGap = 21;

    return Math.floor(width / (elementMinWidth + widthOfColumnGap)) + xPos.start;
}

export function getRowBasedOnHeight(height, elementMinHeight, yPos) {
    const heightOfRowGap = 41;
    const numberOfGaps = Math.floor(height / (elementMinHeight + heightOfRowGap));

    return numberOfGaps * 2 + yPos.start;
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
    getObstaclePointsForBaseCoordinates,
    getHoveredPoints,
    getHighlightingHintPoints,
    getMaxColumnForGivenRow,
    getMaxRowForGivenColumn,
    getColumnBasedOnWidth,
    getRowBasedOnHeight,
    isDraggedElementColliding,
};
