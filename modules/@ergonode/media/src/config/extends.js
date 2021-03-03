/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
    Store,
} from '@Media/config/imports';
import {
    ATTRIBUTE_TYPES,
} from '@Media/defaults';
import {
    getImage,
    setImage,
} from '@Media/extends/productTemplate/methods';

export default {
    extendStore: {
        productTemplate: Store.Template,
    },
    extendComponents: {
        '@UI/components/Grid/Layout/Collection/Cells': {
            MEDIA_ATTACH: Components.GridMediaAttachCollectionCell,
        },
        '@UI/components/Grid/Layout/Table/Cells/Edit': {
            [ATTRIBUTE_TYPES.IMAGE]: Components.GridImageEditCell,
            [ATTRIBUTE_TYPES.GALLERY]: Components.GridGalleryEditCell,
            [ATTRIBUTE_TYPES.FILE]: Components.GridFileEditCell,
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
