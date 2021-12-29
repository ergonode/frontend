/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    Components,
    Icons,
} from '@ProductBatchActions/config/imports';

export default {
    extendComponents: {
        '@Products/components/Grids/ProductsGrid/actionHeader': [
            {
                component: Components.ProductsBatchActionsButton,
                props: {},
                layouts: [
                    GRID_LAYOUT.COLLECTION,
                    GRID_LAYOUT.TABLE,
                ],
            },
        ],
        '@BatchActions/extends/notification/components/Notifications': {
            ProductEditPrecessed: Components.NotificationListBatchActionsProcessingItem,
        },
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
                props: {
                    scope: $this.scope,
                    ...props,
                },
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
