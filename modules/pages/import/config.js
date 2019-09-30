/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Import = () => import('./pages/import/index').then((m) => m.default || m);
const privileges = {
    IMPORT: ['IMPORT_READ'],
};

export default {
    router: [
        {
            name: 'import',
            path: '/import',
            component: Import,
            meta: {
                privileges: privileges.IMPORT,
            },
            // Example how use children tabs
            // children: [
            //     {
            //         path: 'general',
            //         component: ImportBaseTab,
            //     },
            //     {
            //         path: 'settings',
            //         component: ImportSettingsTab,
            //     },
            // ],
        },
    ],
    menu: [
        {
            key: 'COLLECT & DISTRIBUTE',
            items: [
                {
                    title: 'Import',
                    routing: '/import',
                    icon: 'Import',
                    privileges: privileges.IMPORT,
                },
            ],
        },
    ],
    store: [
        {
            directory: 'import',
            name: 'import',
        },
    ],
};
