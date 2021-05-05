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
    STATUS_TRANSITION_EDIT: 'product-status-id',
    STATUS_TRANSITION_EDIT_GENERAL: 'product-status-id-general',
    STATUS_TRANSITION_EDIT_TRANSLATIONS: 'product-status-id-translation',
};

export default [
    {
        name: ROUTE_NAME.WORKFLOW,
        path: '/workflow',
        component: Pages.StatusTransitions,
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
            menuPosition: 1,
            privileges: {
                namespace: Privileges.WORKFLOW.namespace,
                read: Privileges.WORKFLOW.read,
            },
        },
        children: [
            {
                name: ROUTE_NAME.WORKFLOW_DESIGNER,
                path: 'designer',
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
];
