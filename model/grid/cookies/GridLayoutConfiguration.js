/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { COLUMN_IDS } from '~/defaults/grid/cookies';
import { insertValueAtIndex } from '~/model/arrayWrapper';

export function insertColumnAtIndexToCookie(cookies, index, columnId) {
    const columnsIDCookie = cookies.get(COLUMN_IDS);
    const columnIDs = columnsIDCookie.split(',');
    const parsedColumnIDs = insertValueAtIndex(columnIDs, columnId, index);

    cookies.set(COLUMN_IDS, parsedColumnIDs.join(','));
}

export function removeColumnCookieByID(cookies, columnId) {
    const columnsIDCookie = cookies.get(COLUMN_IDS);
    const columnIDs = columnsIDCookie.split(',');

    cookies.set(COLUMN_IDS, columnIDs.filter(id => id !== columnId).join(','));
}
