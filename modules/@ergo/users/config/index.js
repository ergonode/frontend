/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    name: '@ergo/users',
    type: 'local',
    aliases: {
        '@Users': '/',
    },
    plugins: [
        { ssr: true, src: './plugins/privilege' },
    ],
    dictionaries: [
        {
            stateProp: 'privileges',
            dataFormat: {},
            requestPath: '/dictionary/privileges',
        },
    ],
    extendTabs: [
        // {
        //     name: 'settings',
        //     children: [
        //         {
        //             name: 'settings-user',
        //             path: 'user',
        //             component: Tabs.UserSettingsTab,
        //             meta: {
        //                 title: 'User settings',
        //                 privileges: [],
        //             },
        //         },
        //     ],
        // },
    ],
};
