/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { COLUMN_IDS } from '~/defaults/grid/cookies';

export function removeColumnCookieByID(cookies, columnId) {
    const columnsIDCookie = cookies.get(COLUMN_IDS);
    const columnIDs = columnsIDCookie.split(',');

    cookies.set(COLUMN_IDS, columnIDs.filter((id) => id !== columnId).join(','));
}
