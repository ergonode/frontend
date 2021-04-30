/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Users: () => import('@Users/pages/users/index').then(m => m.default || m),
    UserEdit: () => import('@Users/pages/users/_user/_id').then(m => m.default || m),
    Profile: () => import('@Users/pages/profile/index').then(m => m.default || m),
};

export const Tabs = {
    UsersTab: () => import('@Users/components/Tabs/UsersTab').then(m => m.default || m),
    UserGeneralTab: () => import('@Users/components/Tabs/UserGeneralTab').then(m => m.default || m),
    UserAvatarTab: () => import('@Users/components/Tabs/UserAvatarTab').then(m => m.default || m),
    UserLanguageRestrictionsTab: () => import('@Users/components/Tabs/UserLanguageRestrictionsTab').then(m => m.default || m),
    UserActivityLogsTab: () => import('@Users/components/Tabs/UserActivityLogsTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings').then(m => m.default || m),
};

export const Components = {
    GridLanguageRowCheckColumn: () => import('@Users/extends/ui/components/Grid/Layout/Table/Columns/GridLanguageRowCheckColumn').then(m => m.default || m),
    GridLanguageNameHintDataCell: () => import('@Users/extends/ui/components/Grid/Layout/Table/Cells/Data//GridLanguageNameHintDataCell').then(m => m.default || m),
};
