/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from './imports';

export default {
    extendComponents: {
        NAVIGATION_BAR: [
            {
                component: Components.BatchActionsListener,
                props: {},
            },
        ],
    },
};
