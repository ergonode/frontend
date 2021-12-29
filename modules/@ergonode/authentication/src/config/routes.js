/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Pages,
} from '@Authentication/config/imports';

export const ROUTE_NAME = {
    INDEX: 'index',
    PASSWORD_RESET: 'password-reset',
};

export default [
    {
        name: ROUTE_NAME.INDEX,
        path: '/',
        component: Pages.Login,
        meta: {
            isMenu: false,
        },
    },
    {
        name: ROUTE_NAME.PASSWORD_RESET,
        path: '/password-reset',
        component: Pages.PasswordReset,
        meta: {
            isMenu: false,
        },
    },
];
