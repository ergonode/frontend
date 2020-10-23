/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';

export default {
    computed: {
        extendedDataFilterCells() {
            return {
                [GRID_LAYOUT.TABLE]: this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Cells/Data/Filter'),
                [GRID_LAYOUT.COLLECTION]: {},
            };
        },
        extendedDataEditFilterCells() {
            return {
                [GRID_LAYOUT.TABLE]: this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Cells/Edit/Filter'),
                [GRID_LAYOUT.COLLECTION]: {},
            };
        },
        extendedDataCells() {
            return {
                [GRID_LAYOUT.TABLE]: this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Cells/Data'),
                [GRID_LAYOUT.COLLECTION]: this.$getExtendedComponents('@Core/components/Grid/Layout/Collection/Cells'),
            };
        },
        extendedDataEditCells() {
            return {
                [GRID_LAYOUT.TABLE]: this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Cells/Edit'),
                [GRID_LAYOUT.COLLECTION]: {},
            };
        },
        extendedColumns() {
            return {
                [GRID_LAYOUT.TABLE]: this.$getExtendedComponents('@Core/components/Grid/Layout/Table/Columns'),
                [GRID_LAYOUT.COLLECTION]: {},
            };
        },
    },
};
