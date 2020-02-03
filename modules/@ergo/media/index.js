/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/media',
    type: 'page',
    moduleRelations: [],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Media': '/',
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
                    menuPosition: 6,
                    icon: Icons.Media,
                },
                breadcrumbs: [
                    {
                        title: 'Resources',
                        icon: Icons.Media,
                    },
                ],
                isMenu: true,
                menuPosition: 1,
                privileges: {
                    namespace: Privileges.MULTIMEDIA.namespace,
                    read: Privileges.MULTIMEDIA.read,
                },
            },
        },
    ],
};
