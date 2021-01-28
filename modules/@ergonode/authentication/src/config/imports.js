/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Login: () => import('@Authentication/pages/login/index').then(m => m.default || m),
    PasswordReset: () => import('@Authentication/pages/password-reset/index').then(m => m.default || m),
};
