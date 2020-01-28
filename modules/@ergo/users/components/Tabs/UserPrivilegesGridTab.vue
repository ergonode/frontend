/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :editing-privilege-allowed="false"
                :columns="columns"
                :cell-values="cellValues"
                :row-ids="rowIds">
                <template #cell="{ column, columnIndex, rowId, rowIndex, cellData }">
                    <GridCell
                        :key="`${rowId}-${column.id}`"
                        :spacebar-edition="false"
                        :column="columnIndex"
                        :row="rowIndex"
                        :locked="true">
                        <Component
                            :is="getCellComponent(column.type, rowId)"
                            :style="{ justifyContent: 'start' }"
                            :row="rowIndex"
                            :value="cellData.editValue"
                            :hint="descriptions[rowId]"
                            :disabled="true" />
                    </GridCell>
                </template>
            </Grid>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { getMappedGridData } from '@Users/models/privilegesMapper';
import {
    getMappedCellValues,
    getMappedRows,
    getMappedColumns,
} from '@Core/models/mappers/gridDataMapper';
import { COLUMN_TYPE } from '@Core/defaults/grid';
import { STATE } from '@Core/defaults/inputs/checkbox';
import Grid from '@Core/components/Grid/Grid';
import GridCell from '@Core/components/Grid/GridCell';
import GridPresentationHintCell from '@Core/components/Grid/PresentationCells/GridPresentationHintCell';
import GridPresentationCell from '@Core/components/Grid/PresentationCells/GridPresentationCell';
import GridPresentationCheckCell from '@Core/components/Grid/PresentationCells/GridPresentationCheckCell';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'UserPrivilegesGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        GridCell,
        Grid,
    },
    data() {
        return {
            selectedRows: {},
            descriptions: {},
        };
    },
    mounted() {
        this.initializeRowsSelections();
    },
    methods: {
        initializeRowsSelections() {
            this.rowIds.forEach((rowId) => {
                this.selectRowValues(rowId);
            });

            this.selectedRows = { ...this.selectedRows };
        },
        selectRowValues(rowId) {
            const {
                read: { value: colReadValue },
                create: { value: colCreateValue },
                update: { value: colUpdateValue },
                delete: { value: colDeleteValue },
            } = this.cellValues[rowId];

            const privileges = [colReadValue, colCreateValue, colUpdateValue, colDeleteValue];

            if (privileges.every((privilege) => privilege === true)) {
                this.selectedRows[rowId] = STATE.CHECK;
            } else if (privileges.every((privilege) => privilege === false)) {
                this.selectedRows[rowId] = STATE.UNCHECK;
            } else {
                this.selectedRows[rowId] = STATE.CHECK_ANY;
            }
        },
        getCellComponent(type, rowId) {
            if (type === COLUMN_TYPE.TEXT) {
                if (this.descriptions[rowId]) return GridPresentationHintCell;
                return GridPresentationCell;
            }

            return GridPresentationCheckCell;
        },
    },
    asyncData({ store }) {
        const { privileges: privilegesDictionary } = store.state.dictionaries;
        const { privileges } = store.state.authentication.user;
        const {
            rows, columns, descriptions,
        } = getMappedGridData(privilegesDictionary, privileges);
        const { mappedColumns } = getMappedColumns(columns);
        const { rowIds } = getMappedRows(rows);
        const cellValues = getMappedCellValues(columns, rows, rowIds);

        return {
            descriptions,
            rowIds,
            cellValues,
            columns: mappedColumns,
        };
    },
};
</script>
