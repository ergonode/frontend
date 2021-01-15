/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Login: () => import('@Core/pages/login/index').then(m => m.default || m),
    PasswordReset: () => import('@Core/pages/password-reset/index').then(m => m.default || m),
    Placeholder: () => import('@Core/pages/placeholder/index').then(m => m.default || m),
    Settings: () => import('@Core/pages/settings/index').then(m => m.default || m),
    UnitEdit: () => import('@Core/pages/settings/_unit/_id').then(m => m.default || m),
};

export const Tabs = {
    MainSettingsTab: () => import('@Core/components/Tabs/MainSettingsTab').then(m => m.default || m),
    LanguagesSettingsTab: () => import('@Core/components/Tabs/LanguagesSettingsTab').then(m => m.default || m),
    UnitSettingsTab: () => import('@Core/components/Tabs/UnitSettingsTab').then(m => m.default || m),
    UnitGeneralTab: () => import('@Core/components/Tabs/UnitGeneralTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings'),
};
