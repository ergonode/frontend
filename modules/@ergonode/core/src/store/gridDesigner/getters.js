/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getIndexById: state => id => state.gridData.findIndex(el => el.id === id),
    getChildrenLengthById: state => id => state.gridData.find(el => el.id === id).children,
    getExpandStateById: state => id => state.gridData.find(el => el.id === id).expanded,
    getItemById: state => id => state.gridData.find(el => el.id === id),
};
