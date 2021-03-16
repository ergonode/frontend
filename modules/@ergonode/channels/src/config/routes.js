/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from './imports';
import Privileges from './privileges';

export const ROUTE_NAME = {
    CHANNELS: 'channels',
    CHANNELS_GRID: 'channels-grid',
    CHANNEL_EDIT: 'channel-id',
    CHANNEL_EDIT_GENERAL: 'channel-id-general',
    CHANNEL_EDIT_HISTORY: 'channel-id-history',
    CHANNEL_EDIT_SCHEDULER: 'channel-id-scheduler',
};

export default [
    {
        name: ROUTE_NAME.CHANNELS,
        path: '/channels',
        component: Pages.Channels,
        redirect: {
            name: ROUTE_NAME.CHANNELS_GRID,
        },
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
        },
        children: [
            {
                name: ROUTE_NAME.CHANNELS_GRID,
                path: 'grid',
                component: Tabs.ChannelsTab,
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
        name: ROUTE_NAME.CHANNEL_EDIT,
        path: '/channels/channel/:id',
        component: Pages.ChannelEdit,
        redirect: {
            name: ROUTE_NAME.CHANNEL_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.CHANNEL_EDIT_GENERAL,
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
                            routeName: ROUTE_NAME.CHANNELS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.CHANNEL_EDIT_HISTORY,
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
                            routeName: ROUTE_NAME.CHANNELS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.CHANNEL_EDIT_SCHEDULER,
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
                            routeName: ROUTE_NAME.CHANNELS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
