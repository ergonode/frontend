/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';

export default {
    computed: {
        extendedGridComponents() {
            return {
                [GRID_LAYOUT.TABLE]: {
                    dataFilterCells: this.$getExtendedComponents('@UI/components/Grid/Layout/Table/Cells/Data/Filter'),
                    dataEditFilterCells: this.$getExtendedComponents('@UI/components/Grid/Layout/Table/Cells/Edit/Filter'),
                    dataCells: this.$getExtendedComponents('@UI/components/Grid/Layout/Table/Cells/Data'),
                    dataEditCells: this.$getExtendedComponents('@UI/components/Grid/Layout/Table/Cells/Edit'),
                    columns: this.$getExtendedComponents('@UI/components/Grid/Layout/Table/Columns'),
                },
                [GRID_LAYOUT.COLLECTION]: {
                    dataFilterCells: {},
                    dataEditFilterCells: {},
                    dataCells: this.$getExtendedComponents('@UI/components/Grid/Layout/Collection/Cells'),
                    dataEditCells: {},
                    columns: {},
                },
            };
        },
    },
};
