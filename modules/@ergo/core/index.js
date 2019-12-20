/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// import { Pages, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/core',
    type: 'page',
    Privileges,
    nuxt: {
        aliases: {
            '@Core': '/modules/@ergo/core',
        },
    },
    router: [
    ],
    store: [
    ],
};
