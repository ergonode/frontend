/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Icons,
    Store,
} from '@Categories/config/imports';
import {
    getCategory,
    setCategory,
} from '@Categories/extends/product/methods';

export default {
    extendStore: {
        product: Store.Product,
    },
    extendComponents: {
        '@Products/components/Forms/ProductForm': {
            __ALL: [
                {
                    component: Components.ProductFormCategory,
                    props: {},
                    order: 20,
                },
            ],
        },
    },
    extendMethods: {
        '@Trees/components/Tabs/CategoryTreeDesignerTab/verticalTabs': ({
            props,
            $this,
        }) => [
            {
                title: $this.$t('@Categories.category._.title'),
                component: Components.CategoriesVerticalTab,
                icon: Icons.IconTree,
                props: {
                    scope: $this.scope,
                    isSelectLanguage: false,
                    ...props,
                },
            },
        ],
        '@Products/store/product/action/getProduct/__after': ({
            $this, data,
        }) => {
            setCategory({
                $this,
                data,
            });
        },
        '@Products/store/product/action/updateProduct/__before': ({
            $this,
        }) => getCategory({
            $this,
        }),
        '@Products/store/product/action/createProduct/__before': ({
            $this,
        }) => getCategory({
            $this,
        }),
    },
};
