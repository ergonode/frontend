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
        redirect: {
            name: 'status-transitions-grid',
        },
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
        redirect: {
            name: 'transition-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'transition-id-general',
                path: 'general',
                component: Tabs.StatusTransitionGeneralTab,
                meta: {
                    title: 'Options',
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
                component: Tabs.ConditionDesignerTab,
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
