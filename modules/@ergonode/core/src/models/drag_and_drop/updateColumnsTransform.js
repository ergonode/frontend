/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

function getColumnElBounds(contentGrid, index) {
    const {
        width,
    } = contentGrid.children[index].getBoundingClientRect();
    const {
        transform,
    } = contentGrid.children[index].style;

    return {
        colWidth: parseInt(width, 10),
        colTransform: +transform.replace(/[^0-9\-.,]/g, ''),
    };
}

function getLowerBoundsTransforms(
    contentGrid,
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
            } = getColumnElBounds(contentGrid, index);

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
    contentGrid,
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
            } = getColumnElBounds(contentGrid, index);

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

export default function (targetGhostIndex, draggedElIndex, ghostIndex) {
    const columnsSection = document.documentElement.querySelector('.columns-section');
    const {
        width: ghostWidth,
    } = columnsSection.children[draggedElIndex]
        .getBoundingClientRect();
    const ghostTransform = +columnsSection.children[draggedElIndex].style.transform.replace(/[^0-9\-.,]/g, '');
    let bounds = {};

    if (targetGhostIndex < ghostIndex) {
        bounds = getLowerBoundsTransforms(
            columnsSection,
            ghostWidth,
            ghostTransform,
            targetGhostIndex,
            draggedElIndex,
            ghostIndex,
        );
    } else {
        bounds = getUpperBoundsTransforms(
            columnsSection,
            ghostWidth,
            ghostTransform,
            targetGhostIndex,
            draggedElIndex,
            ghostIndex,
        );
    }
    Object.keys(bounds.transforms).forEach((index) => {
        columnsSection.children[index].style.transform = `translateX(${bounds.transforms[index]}px)`;
    });

    columnsSection.children[draggedElIndex].style.transform = `translateX(${bounds.updatedGhostTransform}px)`;
}
