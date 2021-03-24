/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    UsersActivityLogs: () => import('@ActivityLogs/pages/activity-logs/index').then(m => m.default || m),
};

export const Tabs = {
    UsersActivityLogsTab: () => import('@ActivityLogs/components/Tabs/UsersActivityLogsTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings').then(m => m.default || m),
};
