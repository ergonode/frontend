/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Media: () => import('@Media/pages/media/index').then(m => m.default || m),
};

export const Tabs = {
    MediaGridTab: () => import('@Media/components/Tabs/MediaGridTab').then(m => m.default || m),
};

export const Icons = {
    Media: () => import('@Core/components/Icons/Menu/IconMedia'),
};
