/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
    Icons,
    Store,
} from '@Templates/config/imports';
import {
    ROUTE_NAME,
} from '@Templates/config/routes';
import {
    getTemplate,
    setTemplate,
} from '@Templates/extends/methods';

export default {
    extendStore: {
        product: Store.Product,
    },
    extendComponents: {
        '@Products/components/Forms/ProductForm': {
            __ALL: [
                {
                    component: Components.ProductFormTemplate,
                    props: {},
                    order: 10,
                },
            ],
        },
        '@Products/components/Tabs/ProductTemplateTab/placeholderAction': [
            {
                component: Components.EditProductTemplateButton,
                props: {},
            },
        ],
    },
    extendMethods: {
        '@Media/components/Buttons/LinkRelationButton/routeLinks': () => ({
            template: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_GENERAL,
        }),
        '@Templates/components/Tabs/TemplateDesignerTab/verticalTabs': ({
            $this,
            props,
        }) => [
            {
                title: $this.$t('@Templates.productTemplateExtend.methods.widgetsVerticalTabTitle'),
                component: Components.WidgetsVerticalTab,
                icon: Icons.IconWidget,
                props: {
                    scope: $this.scope,
                    ...props,
                },
            },
        ],
        '@Products/store/product/action/getProduct/__after': ({
            $this, data,
        }) => {
            setTemplate({
                $this,
                data,
            });
        },
        '@Products/store/product/action/updateProduct/__before': ({
            $this,
        }) => getTemplate({
            $this,
        }),
        '@Products/store/product/action/createProduct/__before': ({
            $this,
        }) => getTemplate({
            $this,
        }),
    },
};
