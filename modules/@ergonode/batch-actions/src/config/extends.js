/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from './imports';

export default {
    extendComponents: {
        '@Core/layouts/default/appMain': [
            {
                component: Components.BatchActionsListener,
                props: {},
            },
        ],
    },
};
