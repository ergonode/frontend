/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Import = () => import('./pages/import/index').then(m => m.default || m);

export default {
    router: [
        {
            name: 'import',
            path: '/import',
            component: Import,
            meta: {
                privileges: ['IMPORT_READ'],
            },
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
                    privileges: ['IMPORT_READ'],
                },
            ],
        },
    ],
    store: [
        {
            directoryStoreName: 'import',
            storeName: 'import',
        },
    ],
};
