/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setSideBarState: (state, value) => {
        state.sideBarState = value;
    },
    clearStorage: (state) => {
        state.sideBarState = 0;
    },
};
