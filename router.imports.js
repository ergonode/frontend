/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Login: () => import('~/pages/index').then((m) => m.default || m),
    Dashboard: () => import('~/pages/dashboard/index').then((m) => m.default || m),
    Profile: () => import('~/pages/profile/index').then((m) => m.default || m),
    Placeholder: () => import('~/pages/placeholder/index').then((m) => m.default || m),
    Notifications: () => import('~/pages/notifications/index').then((m) => m.default || m),
};

export const GridTabs = {
    UserActivityLogsGridTab: () => import('~/components/Card/Grid/UserActivityLogsGridTab').then((m) => m.default || m),
    UserPrivilegesGridTab: () => import('~/components/Card/Grid/UserPrivilegesGridTab').then((m) => m.default || m),
    NotificationGridTab: () => import('~/components/Card/Grid/NotificationGridTab').then((m) => m.default || m),
};
