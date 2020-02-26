/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/notifications',
    type: 'local',
    aliases: {
        '@Notifications': '/',
    },
    extendComponents: {
        NAVIGATION_BAR: [
            {
                component: () => import('@Notifications/components/NavigationBar/NavigationBarNotificationButton'),
                props: {},
            },
        ],
    },
};
