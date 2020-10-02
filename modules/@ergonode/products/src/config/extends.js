/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    prepareProductVariantData,
    setBindingAttributes,
} from '@Products/extends/methods';

import {
    Components,
    Icons,
    Store,
    Tabs,
} from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'productTypes',
            dataFormat: {},
            requestPath: '/dictionary/product-type',
        },
    ],
    extendStore: {
        product: Store.Product,
    },
    extendTabs: [
        {
            name: 'product-id', // existing router name what we want extend
            children: [ // array with router to extend
                {
                    name: 'product-id-variants',
                    path: 'variants',
                    component: Tabs.ProductVariantsTab,
                    meta: {
                        title: 'Variants',
                        visible: false,
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-id-group',
                    path: 'group',
                    component: Tabs.ProductGroupTab,
                    meta: {
                        title: 'Group',
                        visible: false,
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
    ],
    extendMethods: {
        '@Core/pages/tabs': ({
            $this, type = null, tabs,
        }) => {
            switch ($this.$route.matched[0].name) {
            case 'product-id': {
                switch (type) {
                case PRODUCT_TYPE.WITH_VARIANTS:
                    return tabs.filter(tab => tab.visible || tab.title === 'Variants');
                case PRODUCT_TYPE.GROUPING:
                    return tabs.filter(tab => tab.visible || tab.title === 'Group');
                default:
                    return tabs.filter(tab => tab.visible);
                }
            }
            default:
                return tabs.filter(tab => tab.visible);
            }
        },
        '@Products/store/product/action/getProduct/__after': async ({
            $this, data, type,
        }) => {
            switch (type) {
            case PRODUCT_TYPE.WITH_VARIANTS:
                await setBindingAttributes({
                    $this,
                    data,
                });
                break;
            default:
                break;
            }
        },
        '@Products/store/product/action/createProduct/__before': ({
            $this, type,
        }) => {
            switch (type) {
            case PRODUCT_TYPE.WITH_VARIANTS:
                return prepareProductVariantData({
                    $this,
                });
            default:
                return {};
            }
        },
        '@Products/store/product/action/updateProduct/__before': ({
            $this, type,
        }) => {
            switch (type) {
            case PRODUCT_TYPE.WITH_VARIANTS:
                return prepareProductVariantData({
                    $this,
                });
            default:
                return {};
            }
        },
        '@Products/components/Tabs/ProductGroupTab/filteredProductTypes': () => [
            PRODUCT_TYPE.SIMPLE_PRODUCT,
            PRODUCT_TYPE.WITH_VARIANTS,
        ],
        '@Products/components/Tabs/ProductVariantsTab/filteredProductTypes': () => [
            PRODUCT_TYPE.SIMPLE_PRODUCT,
        ],
    },
    extendComponents: {
        '@Products/components/Forms/ProductForm': {
            [PRODUCT_TYPE.WITH_VARIANTS]: [
                {
                    component: Components.ProductFormAttributeBinding,
                    props: {},
                },
            ],
        },
    },
};
