/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Segments/config/imports';
import Privileges from '@Segments/config/privileges';

export const ROUTE_NAME = {
    SEGMENTS: 'segments',
    SEGMENTS_GRID: 'segments-grid',
    SEGMENT_EDIT: 'segment-id',
    SEGMENT_EDIT_GENERAL: 'segment-id-general',
    SEGMENT_EDIT_TRANSLATIONS: 'segment-id-translations',
    SEGMENT_EDIT_CONDITIONS: 'segment-id-conditions',
};

export default [
    {
        name: ROUTE_NAME.SEGMENTS,
        path: '/segments',
        component: Pages.Segments,
        redirect: {
            name: ROUTE_NAME.SEGMENTS_GRID,
        },
        meta: {
            access: true,
            title: 'Segments',
            group: {
                title: 'Products',
                menuPosition: 2,
                icon: Icons.Product,
            },
            isMenu: true,
            menuPosition: 2,
            privileges: {
                namespace: Privileges.SEGMENT.namespace,
                read: Privileges.SEGMENT.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.SEGMENTS_GRID,
                path: 'grid',
                component: Tabs.SegmentsGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: ROUTE_NAME.SEGMENT_EDIT,
        path: '/segments/segment/:id',
        component: Pages.SegmentEdit,
        redirect: {
            name: ROUTE_NAME.SEGMENT_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.SEGMENT_EDIT_GENERAL,
                path: 'general',
                component: Tabs.SegmentGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Segments',
                            routeName: ROUTE_NAME.SEGMENTS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.SEGMENT_EDIT_TRANSLATIONS,
                path: 'translations',
                component: Tabs.SegmentTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Segments',
                            routeName: ROUTE_NAME.SEGMENTS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.SEGMENT_EDIT_CONDITIONS,
                path: 'conditions',
                component: Tabs.ConditionDesignerTab,
                meta: {
                    title: 'Conditions',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Segments',
                            routeName: ROUTE_NAME.SEGMENTS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
