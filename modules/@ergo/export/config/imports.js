/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Placeholder: () => import('@Core/pages/placeholder/index').then((m) => m.default || m),
};

export const Icons = {
    Channels: () => import('@Core/components/Icons/Menu/IconChannels'),
};
