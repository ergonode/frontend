/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import extendRoutesChildren from '@Roles/config/extendRoutesChildren';
import {
    Components,
    Store,
} from '@Roles/config/imports';
import {
    getTransition,
    setTransition,
} from '@Roles/extends/transition/methods';
import {
    getRole,
    setRole,
} from '@Roles/extends/user/methods';
import {
    getWorkflowTransition,
    setWorkflowTransition,
} from '@Roles/extends/workflow/methods';

export default {
    dictionaries: [
        {
            stateProp: 'privileges',
            defaultValue: [],
            request: {
                path: '/dictionary/privileges',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
    extendStore: {
        user: Store.User,
        statusTransition: Store.Transition,
        workflow: Store.Workflow,
    },
    extendRoutesChildren,
    extendComponents: {
        '@Users/components/Forms/UserForm': {
            __ALL: [
                {
                    component: Components.UserFormRole,
                    order: 10,
                },
            ],
        },
        '@Transitions/components/Forms/TransitionForm': {
            __ALL: [
                {
                    component: Components.TransitionFormRole,
                    order: 10,
                },
            ],
        },
        '@Workflow/components/Forms/WorkflowTransitionForm': {
            __ALL: [
                {
                    component: Components.WorkflowTransitionFormRole,
                    order: 10,
                },
            ],
        },
        '@UI/components/Grid/Layout/Table/Cells/Data': {
            PRIVILEGE_NAME_HINT: Components.GridPrivilegeNameHintDataCell,
        },
        '@UI/components/Grid/Layout/Table/Columns': {
            PRIVILEGE_ROW_CHECK: Components.GridPrivilegeRowCheckColumn,
        },
    },
    extendMethods: {
        '@Users/store/user/action/getUser/__after': ({
            $this, data,
        }) => {
            setRole({
                $this,
                data,
            });
        },
        '@Users/store/user/action/updateUser/__before': ({
            $this,
        }) => getRole({
            $this,
        }),
        '@Users/store/user/action/createUser/__before': ({
            $this,
        }) => getRole({
            $this,
        }),
        '@Transitions/store/statusTransition/action/getStatusTransition/__after': ({
            $this, data,
        }) => {
            setTransition({
                $this,
                data,
            });
        },
        '@Transitions/store/statusTransition/action/updateStatusTransition/__before': ({
            $this,
        }) => getTransition({
            $this,
        }),
        '@Transitions/store/statusTransition/action/createStatusTransition/__before': ({
            $this,
        }) => getTransition({
            $this,
        }),
        '@Workflow/store/workflow/action/updateTransition/__before': ({
            $this,
        }) => getWorkflowTransition({
            $this,
        }),
        '@Workflow/store/workflow/action/getTransition/__after': ({
            $this, data,
        }) => {
            setWorkflowTransition({
                $this,
                data,
            });
        },
    },
};
