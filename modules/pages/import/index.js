/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Import = () => import('./pages/import/index').then((m) => m.default || m);
const privileges = {
    IMPORT: {
        namespace: 'IMPORT',
        read: 'IMPORT_READ',
    },
};

export default {
    privileges,
    router: [
        {
            name: 'imports',
            path: '/imports',
            component: Import,
            meta: {
                access: true,
                title: 'Imports',
                group: {
                    title: 'Sources',
                    icon: 'Export',
                },
                isMenu: true,
                privileges: privileges.IMPORT,
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
