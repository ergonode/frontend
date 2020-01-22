/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                title="Role privileges"
                :editing-privilege-allowed="isEditingAllowed"
                :columns="columns"
                :cell-values="cellValues"
                :row-ids="rowIds"
                :is-select-column="true">
                <template #headerSelectAllRowsCell="{ row, column }">
                    <GridCell
                        editing-allowed
                        spacebar-edition
                        :row="row"
                        :column="column"
                        :editing="Boolean(rowsSelectionState)"
                        @edit="onSelectAllRows">
                        <GridPresentationCheckCell
                            :value="rowsSelectionState"
                            @input="onSelectAllRows" />
                    </GridCell>
                </template>
                <template #selectRowCell="{ row, column }">
                    <GridCell
                        editing-allowed
                        spacebar-edition
                        :row="row"
                        :column="column"
                        @edit="onSelectRow(row - 1)">
                        <GridPresentationCheckCell
                            :value="selectedRows[row - 1]"
                            @input="onSelectRow(row - 1)" />
                    </GridCell>
                </template>
                <template #cell="{ column, columnIndex, rowId, rowIndex, cellData }">
                    <GridCell
                        :key="`${rowId}-${column.id}`"
                        :row="rowIndex"
                        :column="columnIndex"
                        :locked="isColumnTypeText(column.type) || !isEditingAllowed"
                        :spacebar-edition="!isColumnTypeText(column.type)"
                        @edit="onValueChange(rowId, column.id, cellData)">
                        <Component
                            :is="getCellComponent(column.type, rowId)"
                            :style="{ justifyContent: 'start' }"
                            :row="rowIndex"
                            :value="cellData.editValue"
                            :hint="descriptions[rowId]"
                            :disabled="!isEditingAllowed"
                            @input="onValueChange(rowId, column.id, cellData)" />
                    </GridCell>
                </template>
            </Grid>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedGridData } from '~/model/mappers/privilegesMapper';
import {
    getMappedCellValues,
    getMappedRows,
    getMappedColumns,
} from '~/model/mappers/gridDataMapper';
import { COLUMN_TYPE } from '~/defaults/grid';
import { STATE } from '~/defaults/inputs/checkbox';
import Grid from '~/core/components/Grid/Grid';
import GridCell from '~/core/components/Grid/GridCell';
import GridPresentationHintCell from '~/core/components/Grid/PresentationCells/GridPresentationHintCell';
import GridPresentationCell from '~/core/components/Grid/PresentationCells/GridPresentationCell';
import GridPresentationCheckCell from '~/core/components/Grid/PresentationCells/GridPresentationCheckCell';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'UserRolePrivilegesTab',
    components: {
        ResponsiveCenteredViewTemplate,
        GridCell,
        GridPresentationCheckCell,
        GridPresentationCell,
        Grid,
    },
    data() {
        return {
            isSelectedAllRows: STATE.UNCHECK,
            selectedRows: {},
            descriptions: {},
            description: '',
            rowIds: [],
            cellValues: {},
            columns: [],
        };
    },
    computed: {
        ...mapState('data', {
            privilegesDictionary: (state) => state.privileges,
        }),
        ...mapState('roles', {
            privileges: (state) => state.privileges,
        }),
        isEditingAllowed() {
            return this.$hasAccess(['USER_ROLE_UPDATE']);
        },
        rowsSelectionState() {
            if (this.rowsAreDeselected) {
                return STATE.UNCHECK;
            }

            if (this.rowsAreSelected) {
                return STATE.CHECK;
            }

            return STATE.CHECK_ANY;
        },
        selectedRowsValues() {
            return Object.values(this.selectedRows);
        },
        rowsAreDeselected() {
            return this.selectedRowsValues.every((rowState) => rowState === STATE.UNCHECK);
        },
        rowsAreSelected() {
            return this.selectedRowsValues.every((rowState) => rowState === STATE.CHECK);
        },
    },
    created() {
        const {
            rows, columns, descriptions,
        } = getMappedGridData(this.privilegesDictionary, this.privileges);
        const { mappedColumns } = getMappedColumns(columns);
        const { rowIds } = getMappedRows(rows);
        const cellValues = getMappedCellValues(columns, rows, rowIds);

        this.description = descriptions;
        this.rowIds = rowIds;
        this.cellValues = cellValues;
        this.columns = mappedColumns;
        this.setSelectedRolePrivileges(JSON.parse(JSON.stringify(cellValues)));
    },
    mounted() {
        this.initializeRowsSelections();
    },
    methods: {
        ...mapActions('roles', [
            'setSelectedRolePrivileges',
        ]),
        onSelectRow(row) {
            const value = !this.selectedRows[row];

            this.selectedRows[row] = +value;
            this.selectedRows = { ...this.selectedRows };

            this.updateDataCellValues(row, +value);
        },
        onSelectAllRows(value) {
            this.selectEveryRowValues(value);
        },
        onValueChange(rowId, columnId, cellData) {
            if (columnId !== 'name') {
                const value = !cellData.editValue;

                if (columnId !== 'read' && value) {
                    this.cellValues[rowId][columnId].editValue = false;
                    this.cellValues[rowId].read.editValue = true;
                }

                if (columnId === 'read') {
                    this.cellValues[rowId].create.editValue = false;
                    this.cellValues[rowId].update.editValue = false;
                    this.cellValues[rowId].delete.editValue = false;
                }

                this.cellValues[rowId][columnId].editValue = value;
                this.selectRowValues(rowId);
                this.setSelectedRolePrivileges(JSON.parse(JSON.stringify(this.cellValues)));
            }
        },
        initializeRowsSelections() {
            this.rowIds.forEach((rowId) => {
                this.selectRowValues(rowId);
            });

            this.selectedRows = { ...this.selectedRows };
        },
        selectRowValues(rowId) {
            const {
                read: { editValue: colReadValue },
                create: { editValue: colCreateValue },
                update: { editValue: colUpdateValue },
                delete: { editValue: colDeleteValue },
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
        updateDataCellValues(rowId, isSelected) {
            this.cellValues[rowId].read.editValue = isSelected;
            this.cellValues[rowId].create.editValue = isSelected;
            this.cellValues[rowId].update.editValue = isSelected;
            this.cellValues[rowId].delete.editValue = isSelected;
            this.setSelectedRolePrivileges(JSON.parse(JSON.stringify(this.cellValues)));
        },
        selectEveryRowValues(isSelected) {
            this.rowIds.forEach((rowId) => {
                this.updateDataCellValues(rowId, isSelected);
                this.selectedRows[rowId] = +isSelected;
            });

            this.selectedRows = { ...this.selectedRows };
        },
        getCellComponent(type, rowId) {
            if (type === COLUMN_TYPE.TEXT) {
                if (this.descriptions[rowId]) return GridPresentationHintCell;
                return GridPresentationCell;
            }

            return GridPresentationCheckCell;
        },
        isColumnTypeText(type) {
            return type === COLUMN_TYPE.TEXT;
        },
    },
};
</script>
