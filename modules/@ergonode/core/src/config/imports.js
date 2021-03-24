/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
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

export const Components = {
    LanguagesVerticalTab: () => import('@Core/components/VerticalTabs/LanguagesVerticalTab').then(m => m.default || m),
};

export const Icons = {
    Settings: () => import('@Core/components/Icons/Menu/IconSettings').then(m => m.default || m),
    IconTranslate: () => import('@UI/components/Icons/Others/IconTranslate').then(m => m.default || m),
};
