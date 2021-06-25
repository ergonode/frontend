/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
    Icons,
} from '@Trees/config/imports';

export default {
    extendComponents: {
        '@UI/components/AdvancedFilters/Type': {
            CATEGORY_TREE: Components.AdvancedFilterCategoryTreeType,
        },
    },
    extendMethods: {
        '@Products/components/Tabs/ProductCatalogTab/verticalTabs': ({
            $this,
        }) => [
            {
                title: $this.$t('@Categories.category._.title'),
                component: Components.CategoryTreesVerticalTab,
                icon: Icons.IconTree,
                props: {
                    scope: $this.scope,
                    value: $this.filters,
                    onValueChange: $this.onFiltersChange,
                },
            },
        ],
        '@Products/components/Modals/AddProductRelationsModalGrid/verticalTabs': ({
            $this,
        }) => [
            {
                title: $this.$t('@Categories.category._.title'),
                component: Components.CategoryTreesVerticalTab,
                icon: Icons.IconTree,
                props: {
                    scope: $this.scope,
                    value: $this.advancedFilterValues,
                    isAddingEnabled: false,
                    onValueChange: $this.onFiltersChange,
                },
            },
        ],
    },
};
