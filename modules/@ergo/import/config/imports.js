/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Import: () => import('@Import/pages/import/index').then((m) => m.default || m),
};

export const Icons = {
    Export: () => import('@Core/components/Icons/Menu/IconExport'),
};
