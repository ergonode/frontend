/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/core',
    type: 'page',
    Privileges,
    nuxt: {
        aliases: {
            '@Core': '/',
        },
        middleware: [
            '/middleware/privilegeRoutingCheck',
            '/middleware/redirectToPath',
        ],
        plugins: [
            '/plugins/axios',
            '/plugins/register-store',
            '/plugins/core',
            { mode: 'client', src: '/plugins/alerts' },
        ],
        css: [
            '/assets/scss/reset.scss',
            '/assets/scss/plugins-config.scss',
            '/assets/scss/font-inter-ui.scss',
            '/assets/scss/typography.scss',
            '/assets/scss/input/input.scss',
        ],
        styleResources: {
            scss: '/assets/scss/main.scss',
        },
    },
    dictionaries: [
        {
            stateProp: 'languages',
            dataFormat: {},
            requestPath: '/dictionary/languages',
        },
    ],
    router: [
        {
            name: 'index',
            path: '/',
            component: Pages.Login,
            meta: {
                isMenu: false,
            },
        },
        {
            name: 'placeholder',
            path: '/placeholder/:placeholder',
            component: Pages.Placeholder,
            meta: {
                isMenu: false,
            },
        },
        {
            name: 'settings',
            path: '/settings',
            component: Pages.Settings,
            children: [
                {
                    name: 'settings-main',
                    path: 'main',
                    component: Tabs.MainSettingsTab,
                    meta: {
                        title: 'Main settings',
                        privileges: [],
                    },
                },
            ],
            meta: {
                access: true,
                title: 'Settings',
                group: {
                    title: 'System',
                    menuPosition: 1000,
                    icon: Icons.Settings,
                },
                breadcrumbs: [
                    {
                        title: 'System',
                        icon: Icons.Settings,
                    },
                ],
                isMenu: true,
                menuPosition: 1000,
                redirectTo: 'main',
            },
        },
    ],
    store: [
        {
            directory: 'dictionaries',
            name: 'dictionaries',
        },
        {
            directory: 'core',
            name: 'core',
        },
        {
            directory: 'validations',
            name: 'validations',
        },
        {
            directory: 'translations',
            name: 'translations',
        },
        {
            directory: 'list',
            name: 'list',
        },
        {
            directory: 'alerts',
            name: 'alerts',
        },
        {
            directory: 'draggable',
            name: 'draggable',
        },
        {
            directory: 'gridDesigner',
            name: 'gridDesigner',
        },
        {
            directory: 'gridDraft',
            name: 'gridDraft',
        },
    ],
};
