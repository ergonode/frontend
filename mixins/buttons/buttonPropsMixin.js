/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { THEMES, SIZES } from '@Core/defaults/buttons';

export default {
    props: {
        theme: {
            type: String,
            default: THEMES.PRIMARY,
            validator: (value) => Object.values(THEMES).indexOf(value) !== -1,
        },
        size: {
            type: String,
            default: SIZES.REGULAR,
            validator: (value) => Object.values(SIZES).indexOf(value) !== -1,
        },
        title: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loaded: {
            type: Boolean,
            default: true,
        },
        plain: {
            type: Boolean,
            default: false,
        },
    },
};
