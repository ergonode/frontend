/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    numberOfPages: state => Math.ceil(state.filtered / state.numberOfDisplayedElements),
    columnIndexByID: state => id => state.columns.findIndex(col => col.id === id),
};
