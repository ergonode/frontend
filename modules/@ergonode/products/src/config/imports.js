/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Products: () => import('@Products/pages/catalog/index').then(m => m.default || m),
    ProductEdit: () => import('@Products/pages/catalog/_product/_id').then(m => m.default || m),
};

export const Tabs = {
    ProductCatalogTab: () => import('@Products/components/Tabs/ProductCatalogTab').then(m => m.default || m),
    ProductGeneralTab: () => import('@Products/components/Tabs/ProductGeneralTab').then(m => m.default || m),
    ProductTemplateTab: () => import('@Products/components/Tabs/ProductTemplateTab').then(m => m.default || m),
    ProductHistoryTab: () => import('@Products/components/Tabs/ProductHistoryTab').then(m => m.default || m),
    ProductGroupTab: () => import('@Products/extends/components/Tabs/ProductGroupTab').then(m => m.default || m),
    ProductVariantsTab: () => import('@Products/extends/components/Tabs/ProductVariantsTab').then(m => m.default || m),
};

export const Icons = {
    Product: () => import('@Products/components/Icons/IconProduct').then(m => m.default || m),
    IconRelation: () => import('@Products/components/Icons/IconRelation').then(m => m.default || m),
};

export const Components = {
    GridProductAttachCollectionCell: () => import('@Products/extends/ui/components/Grid/Layout/Collection/Cells/GridProductAttachCollectionCell').then(m => m.default || m),
    GridProductRelationDataCell: () => import('@Products/extends/ui/components/Grid/Layout/Table/Cells/Data/GridProductRelationDataCell').then(m => m.default || m),
    GridLabelDataCell: () => import('@Products/extends/ui/components/Grid/Layout/Table/Cells/Data/GridLabelDataCell').then(m => m.default || m),
    GridLabelEditCell: () => import('@Products/extends/ui/components/Grid/Layout/Table/Cells/Edit/GridLabelEditCell').then(m => m.default || m),
    GridProductRelationEditCell: () => import('@Products/extends/ui/components/Grid/Layout/Table/Cells/Edit/GridProductRelationEditCell').then(m => m.default || m),
};

export const Store = {
    Product: () => import('@Products/extends/store/product').then(m => m.default || m),
};
