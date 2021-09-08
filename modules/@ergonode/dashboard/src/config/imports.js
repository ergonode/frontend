/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Dashboard: () => import('@Dashboard/pages/dashboard/index').then(m => m.default || m),
};

export const Icons = {
    Dashboard: () => import('@Core/components/Icons/Menu/IconDashboard').then(m => m.default || m),
};
