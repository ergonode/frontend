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
    STATUS_TRANSITIONS: 'status-transitions',
    STATUS_TRANSITIONS_GRID: 'status-transitions-grid',
    STATUS_TRANSITION_EDIT: 'status-transition-id',
    STATUS_TRANSITION_EDIT_GENERAL: 'status-transition-id-general',
    STATUS_TRANSITION_EDIT_DESIGNER: 'status-transition-id-designer',
};

export default [
    {
        name: ROUTE_NAME.STATUS_TRANSITIONS,
        path: '/status-transitions',
        component: Pages.StatusTransitions,
        redirect: {
            name: ROUTE_NAME.STATUS_TRANSITIONS_GRID,
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
                name: ROUTE_NAME.STATUS_TRANSITIONS_GRID,
                path: 'grid',
                component: Tabs.TransitionsTab,
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
        name: ROUTE_NAME.STATUS_TRANSITION_EDIT,
        path: '/status-transitions/transition/:id',
        component: Pages.StatusTransitionEdit,
        redirect: {
            name: ROUTE_NAME.STATUS_TRANSITION_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.STATUS_TRANSITION_EDIT_GENERAL,
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
                            routeName: ROUTE_NAME.STATUS_TRANSITIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.STATUS_TRANSITION_EDIT_DESIGNER,
                path: 'condition-sets',
                component: Tabs.ConditionDesignerTab,
                meta: {
                    title: 'Condition sets',
                    breadcrumbs: [
                        {
                            title: 'Workflow',
                            icon: Icons.Flow,
                        },
                        {
                            title: 'Status transitions',
                            routeName: ROUTE_NAME.STATUS_TRANSITIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
