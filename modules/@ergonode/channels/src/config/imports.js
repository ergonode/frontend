/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Channels: () => import('@Channels/pages/channels/index').then(m => m.default || m),
    ChannelEdit: () => import('@Channels/pages/channels/_channel/_id').then(m => m.default || m),
};

export const Tabs = {
    ChannelsTab: () => import('@Channels/components/Tabs/ChannelsTab').then(m => m.default || m),
    ChannelGeneralTab: () => import('@Channels/components/Tabs/ChannelGeneralTab').then(m => m.default || m),
    ChannelSchedulerTab: () => import('@Channels/components/Tabs/ChannelSchedulerTab').then(m => m.default || m),
    ChannelHistoryTab: () => import('@Channels/components/Tabs/ChannelHistoryTab').then(m => m.default || m),
};

export const Icons = {
    Channels: () => import('@Channels/components/Icons/IconChannels').then(m => m.default || m),
};

export const Components = {
    NotificationListExportSuccessItem: () => import('@Channels/extends/notification/components/Notifications/NotificationListExportSuccessItem').then(m => m.default || m),
    NotificationListExportWarningItem: () => import('@Channels/extends/notification/components/Notifications/NotificationListExportWarningItem').then(m => m.default || m),
    NotificationListExportProcessingItem: () => import('@Channels/extends/notification/components/Notifications/NotificationListExportProcessingItem').then(m => m.default || m),
};
