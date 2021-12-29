/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@Notifications/config/imports';

export default {
    extendComponents: {
        '@Core/layouts/default/toolBar': [
            {
                component: Components.ToolBarNotificationButton,
            },
        ],
        '@Core/layouts/default/appMain': [
            {
                component: Components.NotificationsListener,
                props: {},
            },
        ],
    },
};
