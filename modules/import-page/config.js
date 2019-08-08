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
            title: 'COLLECT & DISTRIBUTE',
            menu: [
                {
                    title: 'Import',
                    routing: '/import',
                    icon: 'Import',
                },
            ],
        },
    ],
    store: [
        {
            dirName: 'import',
            storeName: 'importy',
        },
    ],
};
