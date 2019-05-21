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
        isContentExpanded: {
            type: Boolean,
            required: false,
            default: true,
        },
        isContextualMenu: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
};
