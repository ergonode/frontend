/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Transitions/config/imports';
import Privileges from '@Transitions/config/privileges';

export const GROUP = {
    id: 'workflow',
    title: '@Transitions._.routes.group',
};
export const ROUTE_NAME = {
    STATUS_TRANSITIONS: 'status-transitions',
    STATUS_TRANSITIONS_GRID: 'status-transitions-grid',
    STATUS_TRANSITION_EDIT: 'status-transition-id',
    STATUS_TRANSITION_EDIT_GENERAL: 'status-transition-id-general',
    STATUS_TRANSITION_EDIT_CONDITIONS: 'status-transition-id-conditions',
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
            title: '@Transitions._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
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
                            title: GROUP.title,
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
                    title: '@Transitions._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Transitions._.routes.title',
                            routeName: ROUTE_NAME.STATUS_TRANSITIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.STATUS_TRANSITION_EDIT_CONDITIONS,
                path: 'conditions',
                component: Tabs.ConditionDesignerTab,
                meta: {
                    title: '@Transitions._.routes.editConditions',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Transitions._.routes.title',
                            routeName: ROUTE_NAME.STATUS_TRANSITIONS_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
