/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { insertValueAtIndex, swapItemPosition } from '@Core/models/arrayWrapper';

export const removeCookieById = ({ cookies, cookieName, id }) => {
    const cookiesData = cookies.get(cookieName);
    if (!cookiesData) throw new Error('Cookies are not set');

    const parsedData = cookiesData.split(',');

    cookies.set(cookieName, parsedData.filter((value) => value !== id).join(','));
};

export const insertCookieAtIndex = ({
    cookies, cookieName, index, data,
}) => {
    const cookiesData = cookies.get(cookieName);
    if (!cookiesData) throw new Error('Cookies are not set');

    const parsedData = cookiesData.split(',');
    const insertedData = insertValueAtIndex(parsedData, data, index);

    cookies.set(cookieName, insertedData.join(','));
};

export const changeCookiePosition = ({
    cookies, cookieName, from, to,
}) => {
    const cookiesData = cookies.get(cookieName);
    if (!cookiesData) throw new Error('Cookies are not set');

    cookies.set(cookieName, [
        ...swapItemPosition(cookiesData.split(','), from, to),
    ].join(','));
};
