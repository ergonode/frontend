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
    GridMediaAttachCollectionCell: () => import('@Media/extends/ui/components/Grid/Layout/Collection/Cells/GridMediaAttachCollectionCell').then(m => m.default || m),
    ProductTemplateFormUploadImage: () => import('@Media/extends/productTemplate/components/Forms/ProductTemplateFormUploadImage').then(m => m.default || m),
    ProductTemplateFormFileField: () => import('@Media/extends/product/components/Forms/Field/ProductTemplateFormFileField').then(m => m.default || m),
    ProductTemplateFormGalleryField: () => import('@Media/extends/product/components/Forms/Field/ProductTemplateFormGalleryField').then(m => m.default || m),
    ProductTemplateFormImageField: () => import('@Media/extends/product/components/Forms/Field/ProductTemplateFormImageField').then(m => m.default || m),
    GridImageEditCell: () => import('@Media/extends/ui/components/Grid/Layout/Table/Cells/Edit/GridImageEditCell').then(m => m.default || m),
    GridGalleryEditCell: () => import('@Media/extends/ui/components/Grid/Layout/Table/Cells/Edit/GridGalleryEditCell').then(m => m.default || m),
    GridFileEditCell: () => import('@Media/extends/ui/components/Grid/Layout/Table/Cells/Edit/GridFileEditCell').then(m => m.default || m),
    GridImagePreviewEditCell: () => import('@Media/extends/ui/components/Grid/Layout/Table/Cells/Edit/GridImagePreviewEditCell').then(m => m.default || m),
    GridImagePreviewCollectionCell: () => import('@Media/extends/ui/components/Grid/Layout/Collection/Cells/GridImagePreviewCollectionCell').then(m => m.default || m),
    GridImagePreviewColumn: () => import('@Media/extends/ui/components/Grid/Layout/Table/Columns/GridImagePreviewColumn').then(m => m.default || m),
};

export const Icons = {
    Media: () => import('@Media/components/Icons/IconMedia').then(m => m.default || m),
    IconImage: () => import('@Media/components/Icons/IconImage').then(m => m.default || m),
    IconGallery: () => import('@Media/components/Icons/IconGallery').then(m => m.default || m),
    IconFile: () => import('@UI/components/Icons/Others/IconFile').then(m => m.default || m),
};

export const Store = {
    Template: () => import('@Media/extends/productTemplate/store').then(m => m.default || m),
};
