/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Users: () => import('@Users/pages/users/index').then(m => m.default || m),
    UserEdit: () => import('@Users/pages/users/_user/_id').then(m => m.default || m),
    Roles: () => import('@Users/pages/roles/index').then(m => m.default || m),
    RoleEdit: () => import('@Users/pages/roles/_role/_id').then(m => m.default || m),
    Profile: () => import('@Users/pages/profile/index').then(m => m.default || m),
};

export const Tabs = {
    UsersTab: () => import('@Users/components/Tabs/UsersTab').then(m => m.default || m),
    UserGeneralTab: () => import('@Users/components/Tabs/UserGeneralTab').then(m => m.default || m),
    UserAvatarTab: () => import('@Users/components/Tabs/UserAvatarTab').then(m => m.default || m),
    RolesTab: () => import('@Users/components/Tabs/RolesTab').then(m => m.default || m),
    RoleGeneralTab: () => import('@Users/components/Tabs/RoleGeneralTab').then(m => m.default || m),
    RolePrivilegesTab: () => import('@Users/components/Tabs/RolePrivilegesTab').then(m => m.default || m),
    UserLanguageRestrictionsTab: () => import('@Users/components/Tabs/UserLanguageRestrictionsTab').then(m => m.default || m),
    UserActivityLogsTab: () => import('@Users/components/Tabs/UserActivityLogsTab').then(m => m.default || m),
    UserPrivilegesTab: () => import('@Users/components/Tabs/UserPrivilegesTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings').then(m => m.default || m),
};

export const Components = {
    GridPrivilegeNameHintDataCell: () => import('@Users/components/Grid/Layout/Table/Cells/Data/GridPrivilegeNameHintDataCell').then(m => m.default || m),
    GridPrivilegeRowCheckColumn: () => import('@Users/components/Grid/Layout/Table/Columns/GridPrivilegeRowCheckColumn').then(m => m.default || m),
    GridLanguageRowCheckColumn: () => import('@Users/components/Grid/Layout/Table/Columns/GridLanguageRowCheckColumn').then(m => m.default || m),
};
