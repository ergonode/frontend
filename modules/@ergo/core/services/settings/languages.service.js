/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const updateLanguages = ({
    $axios,
    $store,
    data,
}) => {
    const { language } = $store.state.authentication.user;

    return $axios.$put(`${language}/languages`, data);
};
