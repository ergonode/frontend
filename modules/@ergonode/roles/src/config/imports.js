/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Roles: () => import('@Roles/pages/roles/index').then(m => m.default || m),
    RoleEdit: () => import('@Roles/pages/roles/_role/_id').then(m => m.default || m),
};

export const Tabs = {
    RolesTab: () => import('@Roles/components/Tabs/RolesTab').then(m => m.default || m),
    RoleGeneralTab: () => import('@Roles/components/Tabs/RoleGeneralTab').then(m => m.default || m),
    RolePrivilegesTab: () => import('@Roles/components/Tabs/RolePrivilegesTab').then(m => m.default || m),
    UserPrivilegesTab: () => import('@Roles/extends/user/components/Tabs/UserPrivilegesTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings').then(m => m.default || m),
};

export const Components = {
    GridPrivilegeNameHintDataCell: () => import('@Roles/extends/ui/components/Grid/Layout/Table/Cells/Data/GridPrivilegeNameHintDataCell').then(m => m.default || m),
    GridPrivilegeRowCheckColumn: () => import('@Roles/extends/ui/components/Grid/Layout/Table/Columns/GridPrivilegeRowCheckColumn').then(m => m.default || m),
    UserFormRole: () => import('@Roles/extends/user/components/Forms/UserFormRole').then(m => m.default || m),
    TransitionFormRole: () => import('@Roles/extends/transition/components/Forms/TransitionFormRole').then(m => m.default || m),
    WorkflowTransitionFormRole: () => import('@Roles/extends/workflow/components/Forms/WorkflowTransitionFormRole').then(m => m.default || m),
};

export const Store = {
    User: () => import('@Roles/extends/user/store').then(m => m.default || m),
    Transition: () => import('@Roles/extends/transition/store').then(m => m.default || m),
    Workflow: () => import('@Roles/extends/workflow/store').then(m => m.default || m),
};
