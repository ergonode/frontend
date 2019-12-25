/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Login: () => import('@Core/pages/login/index').then((m) => m.default || m),
    Placeholder: () => import('@Core/pages/placeholder/index').then((m) => m.default || m),
};
