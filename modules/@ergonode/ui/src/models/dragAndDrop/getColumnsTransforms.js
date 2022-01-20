/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

function getColumnElBounds(nodeList, index) {
    const {
        width,
    } = nodeList[index].getBoundingClientRect();
    const {
        transform,
    } = nodeList[index].style;

    return {
        colWidth: parseInt(width, 10),
        colTransform: +transform.replace(/[^0-9\-.,]/g, ''),
    };
}

function getLowerBoundsTransforms(
    nodeList,
    ghostWidth,
    ghostTransform,
    targetGhostIndex,
    draggedElIndex,
    ghostIndex,
) {
    const transforms = {};
    let lowerBound = ghostIndex - 1; // We can shift to next iteration - no need to do anything with ghost column
    let updatedGhostTransform = ghostTransform;

    while (lowerBound >= targetGhostIndex) {
        const index = draggedElIndex <= lowerBound ? lowerBound + 1 : lowerBound;

        if (lowerBound !== draggedElIndex) {
            const {
                colWidth, colTransform,
            } = getColumnElBounds(nodeList, index);

            if (colTransform > 0) {
                transforms[index] = 0;
                updatedGhostTransform += colWidth;
            } else {
                transforms[index] = lowerBound > draggedElIndex ? 0 : ghostWidth;
                updatedGhostTransform -= colWidth;
            }
        } else {
            // Reset transforms - columns are at theirs start position
            transforms[index] = 0;
            updatedGhostTransform = 0;
        }

        lowerBound -= 1;
    }

    return {
        transforms,
        updatedGhostTransform,
    };
}

function getUpperBoundsTransforms(
    nodeList,
    ghostWidth,
    ghostTransform,
    targetGhostIndex,
    draggedElIndex,
    ghostIndex,
) {
    const transforms = {};
    let upperBound = ghostIndex + 1; // We can shift to next iteration - no need to do anything with ghost column
    let updatedGhostTransform = ghostTransform;

    while (upperBound <= targetGhostIndex) {
        const index = draggedElIndex >= upperBound ? upperBound - 1 : upperBound;

        if (upperBound !== draggedElIndex) {
            const {
                colWidth, colTransform,
            } = getColumnElBounds(nodeList, index);

            if (colTransform < 0) {
                transforms[index] = 0;
                updatedGhostTransform -= colWidth;
            } else {
                transforms[index] = upperBound < draggedElIndex ? 0 : -ghostWidth;
                updatedGhostTransform += colWidth;
            }
        } else {
            // Reset transforms - columns are at theirs start position
            transforms[index] = 0;
            updatedGhostTransform = 0;
        }

        upperBound += 1;
    }

    return {
        transforms,
        updatedGhostTransform,
    };
}

export default function ({
    targetGhostIndex,
    draggedElIndex,
    ghostIndex,
    columnsSection = null,
    columnsNodeList = null,
}) {
    if (!columnsSection && !columnsNodeList) return false;
    const nodeList = columnsSection ? columnsSection.children : columnsNodeList;
    const {
        width: ghostWidth,
    } = nodeList[draggedElIndex]
        .getBoundingClientRect();
    const ghostTransform = +nodeList[draggedElIndex].style.transform.replace(/[^0-9\-.,]/g, '');
    let bounds = {};

    if (targetGhostIndex < ghostIndex) {
        bounds = getLowerBoundsTransforms(
            nodeList,
            ghostWidth,
            ghostTransform,
            targetGhostIndex,
            draggedElIndex,
            ghostIndex,
        );
    } else {
        bounds = getUpperBoundsTransforms(
            nodeList,
            ghostWidth,
            ghostTransform,
            targetGhostIndex,
            draggedElIndex,
            ghostIndex,
        );
    }

    return bounds;
}
