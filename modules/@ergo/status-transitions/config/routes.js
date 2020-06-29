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
        name: 'status-transitions',
        path: '/status-transitions',
        component: Pages.StatusTransitions,
        meta: {
            access: true,
            title: 'Status transitions',
            group: {
                title: 'Workflow',
                menuPosition: 7,
                icon: Icons.Flow,
            },
            isMenu: true,
            menuPosition: 2,
            privileges: {
                namespace: Privileges.WORKFLOW.namespace,
                read: Privileges.WORKFLOW.read,
            },
            redirectTo: 'status-transitions-grid',
        },
        children: [
            {
                name: 'status-transitions-grid',
                path: 'grid',
                component: Tabs.TransitionsGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Workflow',
                            icon: Icons.Flow,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'transition-source-destination',
        path: '/status-transitions/transition/:id',
        component: Pages.StatusTransitionEdit,
        meta: {
            isMenu: false,
            redirectTo: 'transition-id-general',
        },
        children: [
            {
                name: 'transition-id-general',
                path: 'general',
                component: Tabs.StatusTransitionBaseTab,
                meta: {
                    title: 'General',
                    breadcrumbs: [
                        {
                            title: 'Workflow',
                            icon: Icons.Flow,
                        },
                        {
                            title: 'Status transitions',
                            routeName: 'status-transitions-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'transition-id-designer',
                path: 'designer',
                component: Tabs.ConditionSetDesignTab,
                meta: {
                    title: 'Designer',
                    breadcrumbs: [
                        {
                            title: 'Workflow',
                            icon: Icons.Flow,
                        },
                        {
                            title: 'Status transitions',
                            routeName: 'status-transitions-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
