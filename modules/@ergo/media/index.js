/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/media',
    type: 'page',
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Media': '/modules/@ergo/media',
        },
    },
    router: [
        {
            name: 'media',
            path: '/media',
            component: Pages.Placeholder,
            meta: {
                access: true,
                title: 'Media',
                group: {
                    title: 'Resources',
                    icon: Icons.Media,
                },
                isMenu: true,
                privileges: Privileges.MULTIMEDIA,
            },
        },
    ],
};
