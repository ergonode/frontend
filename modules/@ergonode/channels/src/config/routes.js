/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from './imports';
import Privileges from './privileges';

export default [
    {
        name: 'channels',
        path: '/channels',
        component: Pages.Channels,
        meta: {
            access: true,
            title: 'Channels',
            group: {
                title: 'Data exchange',
                menuPosition: 4,
                icon: Icons.Channels,
            },
            isMenu: true,
            menuPosition: 2,
            privileges: {
                namespace: Privileges.CHANNEL.namespace,
                read: Privileges.CHANNEL.read,
            },
            redirectTo: 'channel-grid',
        },
        children: [
            {
                name: 'channel-grid',
                path: 'grid',
                component: Tabs.ChannelGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Data exchange',
                            icon: Icons.Channels,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'channel-id',
        path: '/channels/channel/:id',
        component: Pages.ChannelEdit,
        meta: {
            isMenu: false,
            redirectTo: 'channel-id-general',
        },
        children: [
            {
                name: 'channel-id-general',
                path: 'general',
                component: Tabs.ChannelGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Data exchange',
                            icon: Icons.Channels,
                        },
                        {
                            title: 'Channels',
                            routeName: 'channel-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'channel-id-history',
                path: 'history',
                component: Tabs.ChannelHistoryTab,
                meta: {
                    title: 'History',
                    breadcrumbs: [
                        {
                            title: 'Data exchange',
                            icon: Icons.Channels,
                        },
                        {
                            title: 'Channels',
                            routeName: 'channel-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'channel-id-scheduler',
                path: 'scheduler',
                component: Tabs.ChannelSchedulerTab,
                meta: {
                    title: 'Scheduler',
                    breadcrumbs: [
                        {
                            title: 'Data exchange',
                            icon: Icons.Channels,
                        },
                        {
                            title: 'Channels',
                            routeName: 'channel-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
