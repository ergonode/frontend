/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import extendRoutesChildren from '@Products/config/extendRoutesChildren';
import {
    Components,
    Store,
} from '@Products/config/imports';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import {
    PRODUCT_TYPE,
} from '@Products/defaults';

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
                    return tabs.filter(tab => tab.visible || tab.title === 'Variants');
                case PRODUCT_TYPE.GROUPING:
                    return tabs.filter(tab => tab.visible || tab.title === 'Groups');
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
        },
        '@UI/components/Grid/Layout/Table/Cells/Edit': {
            LABEL: Components.GridLabelEditCell,
        },
    },
};
