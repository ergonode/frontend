/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Channels: () => import('@Channels/pages/channels/index').then(m => m.default || m),
    ChannelEdit: () => import('@Channels/pages/channels/_channel/_id').then(m => m.default || m),
};

export const Tabs = {
    ChannelGridTab: () => import('@Channels/components/Tabs/ChannelGridTab').then(m => m.default || m),
    ChannelGeneralTab: () => import('@Channels/components/Tabs/ChannelGeneralTab').then(m => m.default || m),
    ChannelSchedulerTab: () => import('@Channels/components/Tabs/ChannelSchedulerTab').then(m => m.default || m),
    ChannelHistoryTab: () => import('@Channels/components/Tabs/ChannelHistoryTab').then(m => m.default || m),
};

export const Icons = {
    Channels: () => import('@Channels/components/Icons/IconChannels'),
};
