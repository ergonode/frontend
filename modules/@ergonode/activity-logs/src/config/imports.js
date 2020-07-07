/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    UsersActivityLogs: () => import('@ActivityLogs/pages/activity-logs/index').then(m => m.default || m),
};

export const Tabs = {
    UsersActivityLogsGridTab: () => import('@ActivityLogs/components/Tabs/UsersActivityLogsGridTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings'),
};
