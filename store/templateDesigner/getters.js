/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    elementDataByType: state => type => state.types.find(
        attributeType => attributeType.type === type,
    ),
    layoutElementByCoordinates: state => coordinates => state.templateLayout.find(
        layoutElement => coordinates && layoutElement.coordinates.xPos.start === coordinates.x
            && layoutElement.coordinates.yPos.start === coordinates.y,
    ),
    layoutElementByID: state => id => state.templateLayout.find(
        layoutElement => layoutElement.data && layoutElement.data.id === id,
    ),
    layoutElementIndex: state => (x, y) => state.templateLayout.findIndex(
        element => element.coordinates.xPos.start === x && element.coordinates.yPos.start === y,
    ),
};
