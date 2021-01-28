/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const scope = 'default';

export const englishCode = 'en_GB';

export const polishCode = 'pl_PL';

export const dutchCode = 'de_DE';

export const fieldKeys = {
    firstName: 'name',
    credentials: 'data',
};

export const languageErrors = {
    name: {
        en_GB: 'name is too long. It should contain 32 characters or less.',
        pl_PL: 'name is too long. It should contain 32 characters or less.',
    },
    placeholder: {
        en_GB: 'placeholder is too long. It should contain 4000 characters or less.',
        pl_PL: 'placeholder is too long. It should contain 4000 characters or less.',
    },
};

export const mappedEnglishLanguageErrors = {
    name: 'name is too long. It should contain 32 characters or less.',
    placeholder: 'placeholder is too long. It should contain 4000 characters or less.',
};

export const mappedGermanLanguageErrors = {};

export const mappedPolishLanguageErrors = {
    name: 'name is too long. It should contain 32 characters or less.',
    placeholder: 'placeholder is too long. It should contain 4000 characters or less.',
};

export const mixedErrorStructure = {
    firstName: 'User first name is required',
    credentials: {
        email: [
            'User email is required',
        ],
        password: [
            'User password is required',
        ],
        passwordRepeat: 'User password repeat is required',
    },
    language: 'User language is required',
};

export const mappedMixedFormErrors = {
    firstName: 'User first name is required',
    credentials: {
        email: 'User email is required',
        password: 'User password is required',
        passwordRepeat: 'User password repeat is required',
    },
    language: 'User language is required',
};

export const mappedMixedFormWithFieldKeysErrors = {
    name: 'User first name is required',
    data: {
        email: 'User email is required',
        password: 'User password is required',
        passwordRepeat: 'User password repeat is required',
    },
    language: 'User language is required',
};

export const simpleFormErrors = {
    firstName: [
        'User first name is required',
    ],
    lastName: [
        'User last name is required',
    ],
    email: [
        'User email is required',
    ],
    password: [
        'User password is required',
    ],
    passwordRepeat: [
        'User password repeat is required',
    ],
    language: [
        'User language is required',
    ],
    roleId: [
        'Role Id is required',
    ],
};

export const mappedSimpleFormErrors = {
    firstName: 'User first name is required',
    lastName: 'User last name is required',
    email: 'User email is required',
    password: 'User password is required',
    passwordRepeat: 'User password repeat is required',
    language: 'User language is required',
    roleId: 'Role Id is required',
};

export const mappedSimpleFormWithFieldKeysErrors = {
    name: 'User first name is required',
    lastName: 'User last name is required',
    email: 'User email is required',
    password: 'User password is required',
    passwordRepeat: 'User password repeat is required',
    language: 'User language is required',
    roleId: 'Role Id is required',
};

export const mappedSimpleFormWithFieldKeysAndScopeErrors = {
    default: {
        name: 'User first name is required',
        lastName: 'User last name is required',
        email: 'User email is required',
        password: 'User password is required',
        passwordRepeat: 'User password repeat is required',
        language: 'User language is required',
        roleId: 'Role Id is required',
    },
};

export const nestedFormErrors = {
    user: {
        firstName: [
            'User first name is required',
        ],
        lastName: [
            'User last name is required',
        ],
        email: [
            'User email is required',
        ],
        password: [
            'User password is required',
        ],
        passwordRepeat: [
            'User password repeat is required',
        ],
        language: [
            'User language is required',
        ],
        roleId: [
            'Role Id is required',
        ],
    },
};

export const mappedNestedFormErrors = {
    user: {
        firstName: 'User first name is required',
        lastName: 'User last name is required',
        email: 'User email is required',
        password: 'User password is required',
        passwordRepeat: 'User password repeat is required',
        language: 'User language is required',
        roleId: 'Role Id is required',
    },
};

export const mappedNestedFormWithFieldKeysErrors = {
    user: {
        name: 'User first name is required',
        lastName: 'User last name is required',
        email: 'User email is required',
        password: 'User password is required',
        passwordRepeat: 'User password repeat is required',
        language: 'User language is required',
        roleId: 'Role Id is required',
    },
};
