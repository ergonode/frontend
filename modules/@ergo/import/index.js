/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/import',
    type: 'page',
    moduleRelations: [
        '@ergo/core',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Import': '/',
        },
    },
    router: [
        {
            name: 'imports',
            path: '/imports',
            component: Pages.Import,
            meta: {
                access: true,
                title: 'Imports',
                group: {
                    title: 'Sources',
                    icon: Icons.Export,
                },
                isMenu: true,
                privileges: {
                    namespace: Privileges.IMPORT.namespace,
                    read: Privileges.IMPORT.read,
                },
            },
        },
    ],
    store: [
        {
            directory: 'import',
            name: 'import',
        },
    ],
};
