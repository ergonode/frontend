/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    props: {
        index: {
            type: Number,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
        isSelected: {
            type: Boolean,
            required: true,
        },
        isExpanded: {
            type: Boolean,
            default: true,
        },
        isContextualMenu: {
            type: Boolean,
            default: false,
        },
    },
};
