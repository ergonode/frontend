/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Imports: () => import('@Import/pages/imports/index').then(m => m.default || m),
    ImportProfileEdit: () => import('@Import/pages/imports/_import/_id').then(m => m.default || m),
    Placeholder: () => import('@Core/pages/placeholder/index').then(m => m.default || m),
};

export const Tabs = {
    ImportProfilesTab: () => import('@Import/components/Tabs/ImportProfilesTab').then(m => m.default || m),
    ImportProfileGeneralTab: () => import('@Import/components/Tabs/ImportProfileGeneralTab').then(m => m.default || m),
    ImportProfileHistoryTab: () => import('@Import/components/Tabs/ImportProfileHistoryTab').then(m => m.default || m),
};

export const Icons = {
    Channels: () => import('@Channels/components/Icons/IconChannels').then(m => m.default || m),
};

export const Components = {
    NotificationListImportSuccessItem: () => import('@Import/extends/notification/components/Notifications/NotificationListImportSuccessItem').then(m => m.default || m),
    NotificationListImportWarningItem: () => import('@Import/extends/notification/components/Notifications/NotificationListImportWarningItem').then(m => m.default || m),
    NotificationListImportProcessingItem: () => import('@Import/extends/notification/components/Notifications/NotificationListImportProcessingItem').then(m => m.default || m),
};
