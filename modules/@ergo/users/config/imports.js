/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
    UsersGridTab: () => import('@Users/components/Tabs/UsersGridTab').then(m => m.default || m),
    UserBaseTab: () => import('@Users/components/Tabs/UserBaseTab').then(m => m.default || m),
    UserAvatarTab: () => import('@Users/components/Tabs/UserAvatarTab').then(m => m.default || m),
    RolesGridTab: () => import('@Users/components/Tabs/RolesGridTab').then(m => m.default || m),
    RoleBaseTab: () => import('@Users/components/Tabs/RoleBaseTab').then(m => m.default || m),
    RolePrivilegesTab: () => import('@Users/components/Tabs/RolePrivilegesTab').then(m => m.default || m),
    UserActivityLogsGridTab: () => import('@Users/components/Tabs/UserActivityLogsGridTab').then(m => m.default || m),
    UserPrivilegesGridTab: () => import('@Users/components/Tabs/UserPrivilegesGridTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings'),
};

export const Components = {
    GridPrivilegeSelectRowColumn: () => import('@Users/components/Grid/Layout/Table/Columns/GridPrivilegeSelectRowColumn'),
    GridPrivilegeColumn: () => import('@Users/components/Grid/Layout/Table/Columns/GridPrivilegeColumn'),
    GridPrivilegeNameColumn: () => import('@Users/components/Grid/Layout/Table/Columns/GridPrivilegeNameColumn'),
};
