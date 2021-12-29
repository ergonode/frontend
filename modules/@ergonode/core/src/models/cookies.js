/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    insertValueAtIndex,
    swapItemPosition,
} from '@Core/models/arrayWrapper';

export const getCookieKey = (store, key) => {
    const {
        user = null,
    } = store.state.authentication;

    return user && user.id ? `[${user.id}]${key}` : key;
};

export const getGridCookieKey = (store, routeName, layout) => getCookieKey(store, `GRID_CONFIG:${layout}/${routeName}`);

export const removeCookieAtIndex = ({
    cookies,
    cookieName,
    index,
}) => {
    const cookiesData = cookies.get(cookieName);

    if (!cookiesData) throw new Error('Cookies are not set');

    const parsedData = cookiesData.split(',');
    parsedData.splice(index, 1);

    cookies.set(cookieName, parsedData.join(','));
};

export const insertCookieAtIndex = ({
    cookies,
    cookieName,
    index,
    data,
}) => {
    const cookiesData = cookies.get(cookieName) || '';
    const parsedData = cookiesData.split(',');
    const insertedData = insertValueAtIndex(parsedData, data, index);

    cookies.set(cookieName, insertedData.join(','));
};

export const changeCookiePosition = ({
    cookies,
    cookieName,
    from,
    to,
}) => {
    const cookiesData = cookies.get(cookieName);

    if (!cookiesData) throw new Error('Cookies are not set');

    const separatedCookies = cookiesData.split(',');

    cookies.set(cookieName, swapItemPosition(separatedCookies, from, to).join(','));
};
