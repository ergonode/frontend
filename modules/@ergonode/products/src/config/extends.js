/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import extendRoutesChildren from '@Products/config/extendRoutesChildren';
import {
    Components,
    Icons,
    Store,
} from '@Products/config/imports';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import {
    ATTRIBUTE_TYPES,
    PRODUCT_TYPE,
} from '@Products/defaults';

const AttributeIcons = {
    [ATTRIBUTE_TYPES.PRODUCT_RELATION]: [
        {
            component: Icons.IconRelation,
        },
    ],
};

export default {
    dictionaries: [
        {
            stateProp: 'productTypes',
            defaultValue: {},
            request: {
                path: '/dictionary/product-type',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
    extendStore: {
        product: Store.Product,
    },
    extendRoutesChildren,
    extendMethods: {
        '@Media/components/Buttons/LinkRelationButton/routeLinks': () => ({
            product: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
        }),
        '@Core/pages/tabs': ({
            $this, type = null, tabs,
        }) => {
            switch ($this.$route.matched[0].name) {
            case ROUTE_NAME.PRODUCT_EDIT: {
                switch (type) {
                case PRODUCT_TYPE.WITH_VARIANTS:
                    return tabs.filter(tab => tab.visible || tab.scope === 'productVariantsTab');
                case PRODUCT_TYPE.GROUPING:
                    return tabs.filter(tab => tab.visible || tab.scope === 'productGroupTab');
                default:
                    return tabs.filter(tab => tab.visible);
                }
            }
            default:
                return tabs.filter(tab => tab.visible);
            }
        },
    },
    extendComponents: {
        '@UI/components/Grid/Layout/Collection/Cells': {
            PRODUCT_ATTACH: Components.GridProductAttachCollectionCell,
        },
        '@UI/components/Grid/Layout/Table/Cells/Data': {
            LABEL: Components.GridLabelDataCell,
            PRODUCT_RELATION: Components.GridProductRelationDataCell,
        },
        '@UI/components/Grid/Layout/Table/Cells/Edit': {
            LABEL: Components.GridLabelEditCell,
            PRODUCT_RELATION: Components.GridProductRelationEditCell,
        },
        '@Attributes/extends/components/SideBars/AttributeSideBarElement/icons': AttributeIcons,
        '@Templates/components/TemplateDesigner/ProductDesigner/AttributeElementContent/icons': AttributeIcons,
    },
};
