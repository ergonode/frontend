/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getBackgroundItem = ({
    pageX,
    pageY,
    itemClass = 'designer-background-item',
    rowAttribute = 'row',
    columnAttribute = 'column',
}) => {
    const elements = document.elementsFromPoint(pageX, pageY);
    const backgroundItem = elements.find(element => element.classList.contains(itemClass));

    if (backgroundItem) {
        return {
            element: backgroundItem,
            row: +backgroundItem.getAttribute(rowAttribute),
            column: +backgroundItem.getAttribute(columnAttribute),
        };
    }

    return null;
};
