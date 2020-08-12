/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Media: () => import('@Media/pages/media/index').then(m => m.default || m),
    ResourceEdit: () => import('@Media/pages/media/_resource/_id').then(m => m.default || m),
};

export const Tabs = {
    MediaGridTab: () => import('@Media/components/Tabs/MediaGridTab').then(m => m.default || m),
    ResourceBaseTab: () => import('@Media/components/Tabs/ResourceBaseTab').then(m => m.default || m),
};

export const Components = {
    GridMediaAttachDataCell: () => import('@Media/components/Grid/Layout/Table/Cells/Data/GridMediaAttachDataCell').then(m => m.default || m),
    GridMediaAttachCollectionCell: () => import('@Media/components/Grid/Layout/Collection/Cells/GridMediaAttachCollectionCell').then(m => m.default || m),
};

export const Icons = {
    Media: () => import('@Core/components/Icons/Menu/IconMedia'),
};
