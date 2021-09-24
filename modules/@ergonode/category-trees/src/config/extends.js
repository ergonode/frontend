/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
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
                layouts: [
                    GRID_LAYOUT.COLLECTION,
                    GRID_LAYOUT.TABLE,
                ],
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
