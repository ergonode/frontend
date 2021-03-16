/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Media: () => import('@Media/pages/media/index').then(m => m.default || m),
    ResourceEdit: () => import('@Media/pages/media/_resource/_id').then(m => m.default || m),
};

export const Tabs = {
    MediaTab: () => import('@Media/components/Tabs/MediaTab').then(m => m.default || m),
    ResourceGeneralTab: () => import('@Media/components/Tabs/ResourceGeneralTab').then(m => m.default || m),
    ResourceTranslationsTab: () => import('@Media/components/Tabs/ResourceTranslationsTab').then(m => m.default || m),
    ResourceInformationTab: () => import('@Media/components/Tabs/ResourceInformationTab').then(m => m.default || m),
    ResourceRelationsTab: () => import('@Media/components/Tabs/ResourceRelationsTab').then(m => m.default || m),
};

export const Components = {
    GridMediaAttachCollectionCell: () => import('@Media/components/Grid/Layout/Collection/Cells/GridMediaAttachCollectionCell').then(m => m.default || m),
};

export const Icons = {
    Media: () => import('@Media/components/Icons/IconMedia').then(m => m.default || m),
};
