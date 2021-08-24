/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
    Icons,
    Store,
} from '@Media/config/imports';
import {
    ATTRIBUTE_TYPES,
} from '@Media/defaults';
import {
    getImage,
    setImage,
} from '@Media/extends/productTemplate/methods';

const AttributeIcons = {
    [ATTRIBUTE_TYPES.IMAGE]: [
        {
            component: Icons.IconImage,
        },
    ],
    [ATTRIBUTE_TYPES.GALLERY]: [
        {
            component: Icons.IconGallery,
        },
    ],
    [ATTRIBUTE_TYPES.FILE]: [
        {
            component: Icons.IconFile,
        },
    ],
};

export default {
    extendStore: {
        productTemplate: Store.Template,
    },
    extendComponents: {
        '@UI/components/Grid/Layout/Table/Columns': {
            IMAGE_PREVIEW: Components.GridImagePreviewColumn,
        },
        '@UI/components/Grid/Layout/Collection/Cells': {
            MEDIA_ATTACH: Components.GridMediaAttachCollectionCell,
            IMAGE_PREVIEW: Components.GridImagePreviewCollectionCell,
        },
        '@UI/components/Grid/Layout/Table/Cells/Edit': {
            [ATTRIBUTE_TYPES.IMAGE]: Components.GridImageEditCell,
            [ATTRIBUTE_TYPES.GALLERY]: Components.GridGalleryEditCell,
            [ATTRIBUTE_TYPES.FILE]: Components.GridFileEditCell,
            IMAGE_PREVIEW: Components.GridImagePreviewEditCell,
        },
        '@Templates/components/Forms/ProductTemplateForm': {
            __ALL: [
                {
                    component: Components.ProductTemplateFormUploadImage,
                    order: 10,
                },
            ],
        },
        '@Products/components/Forms/ProductTemplateForm': {
            [ATTRIBUTE_TYPES.IMAGE]: [
                {
                    component: Components.ProductTemplateFormImageField,
                },
            ],
            [ATTRIBUTE_TYPES.GALLERY]: [
                {
                    component: Components.ProductTemplateFormGalleryField,
                },
            ],
            [ATTRIBUTE_TYPES.FILE]: [
                {
                    component: Components.ProductTemplateFormFileField,
                },
            ],
        },
        '@Attributes/extends/components/SideBars/AttributeSideBarElement/icons': AttributeIcons,
        '@Templates/components/TemplateDesigner/ProductDesigner/AttributeElementContent/icons': AttributeIcons,
    },
    extendMethods: {
        '@Templates/store/productTemplate/action/createTemplate/__before': ({
            $this,
        }) => getImage({
            $this,
        }),
        '@Templates/store/productTemplate/action/updateTemplate/__before': ({
            $this,
        }) => getImage({
            $this,
        }),
        '@Templates/store/productTemplate/action/getTemplate/__after': ({
            $this, data,
        }) => {
            setImage({
                $this,
                data,
            });
        },
    },
};
