/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    numberOfPages: (state) => {
        const result = Math.ceil(state.filtered / state.numberOfDisplayedElements);

        return result > 0 ? result : 1;
    },
};
