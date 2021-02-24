/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@Notifications/config/imports';

export default {
    extendComponents: {
        '@Core/layouts/default/navigationBar': [
            {
                component: Components.ToolBarNotificationButton,
            },
        ],
    },
};
