/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const getLanguageTree = ({
    $axios,
    $store,
}) => {
    const { language } = $store.state.authentication.user;

    return $axios.$get(`${language}/language/tree`);
};

export const updateLanguageTree = ({
    $axios,
    $store,
    data,
}) => {
    const { language } = $store.state.authentication.user;

    return $axios.$put(`${language}/language/tree`, data);
};
