/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getIndexById: state => id => state.treeData.findIndex(el => el.id === id),
    getChildrenLengthById: state => id => state.treeData.find(el => el.id === id).children,
    getChildrenByParentId: state => parentId => state.treeData.filter(
        ({ parent }) => parent === parentId,
    ),
};
