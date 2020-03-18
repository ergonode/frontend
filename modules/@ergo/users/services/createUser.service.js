/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject, getKeyByValue } from '@Core/models/objectWrapper';

export default function ({ $axios, $store }) {
    const { language: loggedUserLanguage } = $store.state.authentication.user;
    const {
        email, firstName, lastName, password, passwordRepeat, role, isActive, language,
    } = $store.state.users;
    const { languages } = $store.state.dictionaries;
    const roleId = isObject(role) ? role.id : null;
    const data = {
        email,
        firstName,
        lastName,
        password,
        passwordRepeat,
        language: getKeyByValue(languages, language),
        roleId,
        isActive,
    };

    return $axios.$post(`${loggedUserLanguage}/accounts`, data);
}
