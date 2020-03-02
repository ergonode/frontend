/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// import { Tabs, Icons } from './imports';

export default {
    // extendTabs: [
    //     {
    //         name: 'settings',
    //         children: [
    //             {
    //                 name: 'settings-user',
    //                 path: 'user',
    //                 component: Tabs.UserSettingsTab,
    //                 meta: {
    //                     title: 'User settings',
    //                     breadcrumbs: [
    //                         {
    //                             title: 'System',
    //                             icon: Icons.Settings,
    //                         },
    //                         {
    //                             title: 'Settings :)',
    //                             routeName: 'settings-main',
    //                         },
    //                     ],
    //                     privileges: [],
    //                 },
    //             },
    //         ],
    //     },
    // ],
    dictionaries: [
        {
            stateProp: 'privileges',
            dataFormat: {},
            requestPath: '/dictionary/privileges',
        },
    ],
};
