/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/core',
    type: 'page',
    Privileges,
    nuxt: {
        aliases: {
            '@Core': '/',
            '@CoreComponents': '/components',
        },
    },
    router: [
        {
            name: 'index',
            path: '/',
            component: Pages.Login,
            meta: {
                isMenu: false,
            },
        },
        {
            name: 'placeholder',
            path: '/placeholder/:placeholder',
            component: Pages.Placeholder,
            meta: {
                isMenu: false,
            },
        },
    ],
};
