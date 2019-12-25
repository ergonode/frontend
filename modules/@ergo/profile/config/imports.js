/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Profile: () => import('@Profile/pages/profile/index').then((m) => m.default || m),
};

export const Tabs = {
    UserActivityLogsGridTab: () => import('@Profile/components/Tabs/UserActivityLogsGridTab').then((m) => m.default || m),
    UserPrivilegesGridTab: () => import('@Profile/components/Tabs/UserPrivilegesGridTab').then((m) => m.default || m),
};
