/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Import = () => import('./pages/import/index').then((m) => m.default || m);
const ImportGridTab = () => import('./components/Tab/ImportGridTab').then((m) => m.default || m);

const privileges = {
    IMPORT: ['IMPORT_READ'],
};

export default {
    router: [
        {
            name: 'imports',
            path: '/imports',
            component: Import,
            meta: {
                privileges: privileges.IMPORT,
            },
            children: [
                {
                    name: 'imports-grid',
                    path: 'grid',
                    component: ImportGridTab,
                    meta: {
                        privileges: privileges.IMPORT,
                    },
                },
            ],
        },
    ],
    menu: [
        {
            key: 'COLLECT & DISTRIBUTE',
            items: [
                {
                    title: 'Import',
                    routing: '/imports',
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
