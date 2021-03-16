/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
    Icons,
} from './imports';

export default {
    extendComponents: {
        '@Products/components/Grids/ProductsGrid/actionHeader': [
            {
                component: Components.ProductsBatchActionsButton,
                props: {},
            },
        ],
        '@Notifications/components/NotificationList/Item': {
            BatchActionEnded: Components.NotificationListBatchActionEndedItem,
        },
    },
    extendMethods: {
        '@ProductBatchActions/components/Modals/UpdateProductsModal/verticalTabs': ({
            props,
            $this,
        }) => [
            {
                title: $this.$t('@ProductBatchActions.productBatchAction._.title'),
                component: Components.AttributesVerticalTab,
                icon: Icons.IconAttributes,
                props,
            },
        ],
        '@Products/components/Grids/ProductsGrid/props': () => ({
            grid: [
                {
                    key: 'is-select-column',
                    value: true,
                    priority: 10,
                },
            ],
        }),
    },
};
