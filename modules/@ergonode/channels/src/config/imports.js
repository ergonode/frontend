/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Channels: () => import('@Channels/pages/channels/index').then(m => m.default || m),
    ChannelEdit: () => import('@Channels/pages/channels/_channel/_id').then(m => m.default || m),
    ExportEdit: () => import('@Channels/pages/channels/_export/_id').then(m => m.default || m),
};

export const Tabs = {
    ChannelGridTab: () => import('@Channels/components/Tabs/ChannelGridTab').then(m => m.default || m),
    ChannelBaseTab: () => import('@Channels/components/Tabs/ChannelBaseTab').then(m => m.default || m),
    ExportBaseTab: () => import('@Channels/components/Tabs/ExportBaseTab').then(m => m.default || m),
    ChannelHistoryTab: () => import('@Channels/components/Tabs/ChannelHistoryTab').then(m => m.default || m),
};

export const Icons = {
    Channels: () => import('@Core/components/Icons/Menu/IconChannels'),
};
