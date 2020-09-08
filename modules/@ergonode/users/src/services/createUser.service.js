/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({
    $axios, $store,
}) {
    const {
        email, firstName, lastName, password, passwordRepeat, role, isActive, language,
    } = $store.state.user;
    const getActiveLanguageByName = $store.getters['core/getActiveLanguageByName'];
    const data = {
        email,
        firstName,
        lastName,
        password,
        passwordRepeat,
        language: getActiveLanguageByName(language).code,
        roleId: role,
        isActive,
    };

    return $axios.$post('accounts', data);
}
