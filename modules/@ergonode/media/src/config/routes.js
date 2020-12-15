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

export const ROUTE_NAME = {
    MEDIA: 'media',
    MEDIA_GRID: 'media-grid',
    MEDIA_RESOURCE_EDIT: 'media-resource-id',
    MEDIA_RESOURCE_EDIT_GENERAL: 'media-resource-id-general',
    MEDIA_RESOURCE_EDIT_TRANSLATIONS: 'media-resource-id-translations',
    MEDIA_RESOURCE_EDIT_INFORMATION: 'media-resource-id-information',
    MEDIA_RESOURCE_EDIT_RELATIONS: 'media-resource-id-relations',
};

export default [
    {
        name: ROUTE_NAME.MEDIA,
        path: '/media',
        component: Pages.Media,
        redirect: {
            name: ROUTE_NAME.MEDIA_GRID,
        },
        meta: {
            access: true,
            title: 'Media',
            group: {
                title: 'Resources',
                menuPosition: 6,
                icon: Icons.Media,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.MULTIMEDIA.namespace,
                read: Privileges.MULTIMEDIA.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.MEDIA_GRID,
                path: 'grid',
                component: Tabs.MediaTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Resources',
                            icon: Icons.Media,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: ROUTE_NAME.MEDIA_RESOURCE_EDIT,
        path: '/media/resource/:id',
        component: Pages.ResourceEdit,
        redirect: {
            name: ROUTE_NAME.MEDIA_RESOURCE_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.MEDIA_RESOURCE_EDIT_GENERAL,
                path: 'general',
                component: Tabs.ResourceGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Resources',
                            icon: Icons.Media,
                        },
                        {
                            title: 'Media',
                            routeName: ROUTE_NAME.MEDIA_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.MEDIA_RESOURCE_EDIT_TRANSLATIONS,
                path: 'translations',
                component: Tabs.ResourceTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Resources',
                            icon: Icons.Media,
                        },
                        {
                            title: 'Media',
                            routeName: ROUTE_NAME.MEDIA_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.MEDIA_RESOURCE_EDIT_INFORMATION,
                path: 'information',
                component: Tabs.ResourceInformationTab,
                meta: {
                    title: 'Information',
                    breadcrumbs: [
                        {
                            title: 'Resources',
                            icon: Icons.Media,
                        },
                        {
                            title: 'Media',
                            routeName: ROUTE_NAME.MEDIA_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.MEDIA_RESOURCE_EDIT_RELATIONS,
                path: 'relations',
                component: Tabs.ResourceRelationsTab,
                meta: {
                    title: 'Relations',
                    breadcrumbs: [
                        {
                            title: 'Resources',
                            icon: Icons.Media,
                        },
                        {
                            title: 'Media',
                            routeName: ROUTE_NAME.MEDIA_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
