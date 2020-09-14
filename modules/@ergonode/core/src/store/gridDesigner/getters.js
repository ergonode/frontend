/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getIndex: state => id => state.gridData.findIndex(el => el.id === id),
    getChildrenLength: state => id => state.gridData.find(el => el.id === id).children,
    getExpandState: state => id => state.gridData.find(el => el.id === id).expanded,
    getItem: state => id => state.gridData.find(el => el.id === id),
};
