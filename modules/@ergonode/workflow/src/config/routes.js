/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Workflow/config/imports';
import Privileges from '@Workflow/config/privileges';

export const GROUP = {
    id: 'workflow',
    title: '@Workflow._.routes.group',
};
export const ROUTE_NAME = {
    WORKFLOW: 'workflow',
    WORKFLOW_DESIGNER: 'workflow-designer',
    WORKFLOW_STATUS_EDIT: 'workflow-status-id',
    WORKFLOW_STATUS_EDIT_GENERAL: 'workflow-status-id-general',
    WORKFLOW_STATUS_EDIT_TRANSLATIONS: 'workflow-status-id-translation',
    WORKFLOW_TRANSITION_EDIT: 'workflow-transition-id',
    WORKFLOW_TRANSITION_EDIT_GENERAL: 'workflow-transition-id-general',
    WORKFLOW_TRANSITION_EDIT_CONDITIONS: 'workflow-transition-id-conditions',
};

export default [
    {
        name: ROUTE_NAME.WORKFLOW,
        path: '/workflow',
        component: Pages.WorkflowStatusTransitions,
        redirect: {
            name: ROUTE_NAME.WORKFLOW_DESIGNER,
        },
        meta: {
            title: '@Workflow._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
                menuPosition: 7,
                icon: Icons.Flow,
            },
            isMenu: true,
            privileges: {
                namespace: Privileges.WORKFLOW.namespace,
                read: Privileges.WORKFLOW.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.WORKFLOW_DESIGNER,
                path: ':workflowId?',
                component: Tabs.WorkflowDesignerTab,
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
        name: ROUTE_NAME.WORKFLOW_STATUS_EDIT,
        path: '/workflow/:workflowId?/status/:id',
        component: Pages.WorkflowStatusEdit,
        redirect: {
            name: ROUTE_NAME.WORKFLOW_STATUS_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.WORKFLOW_STATUS_EDIT_GENERAL,
                path: 'general',
                component: Tabs.WorkflowStatusGeneralTab,
                meta: {
                    title: '@Workflow._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Workflow._.routes.title',
                            routeName: ROUTE_NAME.WORKFLOW_DESIGNER,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.WORKFLOW_STATUS_EDIT_TRANSLATIONS,
                path: 'translations',
                component: Tabs.WorkflowStatusTranslationsTab,
                meta: {
                    title: '@Workflow._.routes.editTranslations',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Workflow._.routes.title',
                            routeName: ROUTE_NAME.WORKFLOW_DESIGNER,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT,
        path: '/workflow/:workflowId?/transition/:id',
        component: Pages.WorkflowTransitionEdit,
        redirect: {
            name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT_GENERAL,
                path: 'general',
                component: Tabs.WorkflowTransitionGeneralTab,
                meta: {
                    title: '@Workflow._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Workflow._.routes.title',
                            routeName: ROUTE_NAME.WORKFLOW_DESIGNER,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT_CONDITIONS,
                path: 'conditions',
                component: Tabs.WorkflowTransitionConditionDesignerTab,
                meta: {
                    title: '@Workflow._.routes.editConditions',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Workflow._.routes.title',
                            routeName: ROUTE_NAME.WORKFLOW_DESIGNER,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
