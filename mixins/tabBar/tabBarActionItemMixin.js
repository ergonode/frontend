/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    props: {
        onClick: {
            type: Function,
            required: false,
            default: () => {},
        },
        index: {
            type: String,
            required: false,
            default: null,
        },
        title: {
            type: String,
            required: false,
            default: null,
        },
    },
};
