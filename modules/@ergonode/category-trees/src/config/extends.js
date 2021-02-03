/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
} from './imports';

export default {
    extendComponents: {
        '@UI/components/AdvancedFilters/Type': {
            CATEGORY_TREE: Components.AdvancedFilterCategoryTreeType,
        },
    },
    extendMethods: {
        '@Products/components/Tabs/ProductCatalogTab/verticalTabs': ({}) => [
            {
                title: 'Categories',
                component: () => import('@Trees/extends/product/components/VerticalTabs/CategoryTreesVerticalTab'),
                icon: () => import('@Trees/components/Icons/IconTree'),
                props: {},
            },
        ],
    },
};
