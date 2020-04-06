/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

function getColumnElBounds(contentGrid, index) {
    const { width } = contentGrid.children[index].getBoundingClientRect();
    const { transform } = contentGrid.children[index].style;

    return { colWidth: parseInt(width, 10), colTransform: +transform.replace(/[^0-9\-.,]/g, '') };
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

    return { transforms, updatedGhostTransform };
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

    return { transforms, updatedGhostTransform };
}

export default function (targetGhostIndex, draggedElIndex, ghostIndex) {
    const gridTableLayout = document.documentElement.querySelector('.grid-table-layout');
    const { width: ghostWidth } = gridTableLayout.children[draggedElIndex]
        .getBoundingClientRect();
    const ghostTransform = +gridTableLayout.children[draggedElIndex].style.transform.replace(/[^0-9\-.,]/g, '');
    let bounds = {};

    if (targetGhostIndex < ghostIndex) {
        bounds = getLowerBoundsTransforms(
            gridTableLayout,
            ghostWidth,
            ghostTransform,
            targetGhostIndex,
            draggedElIndex,
            ghostIndex,
        );
    } else {
        bounds = getUpperBoundsTransforms(
            gridTableLayout,
            ghostWidth,
            ghostTransform,
            targetGhostIndex,
            draggedElIndex,
            ghostIndex,
        );
    }
    Object.keys(bounds.transforms).forEach((index) => {
        gridTableLayout.children[index].style.transform = `translateX(${bounds.transforms[index]}px)`;
    });

    gridTableLayout.children[draggedElIndex].style.transform = `translateX(${bounds.updatedGhostTransform}px)`;
}
