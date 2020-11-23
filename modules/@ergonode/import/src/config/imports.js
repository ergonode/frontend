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
    ImportProfileGridTab: () => import('@Import/components/Tabs/ImportProfileGridTab').then(m => m.default || m),
    ImportProfileGeneralTab: () => import('@Import/components/Tabs/ImportProfileGeneralTab').then(m => m.default || m),
    ImportProfileHistoryTab: () => import('@Import/components/Tabs/ImportProfileHistoryTab').then(m => m.default || m),
};

export const Icons = {
    Channels: () => import('@Channels/components/Icons/IconChannels'),
};
