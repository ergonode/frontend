/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="privilegesGrid"
                :is-draft="false"
                :edit-route="editRoute"
                :basic-filters="false"
                :extender-column="false"
                :edit-column="false"
                :is-column-editable="false"
                title="Role privileges">
                <template #headerSelectAllRowsCell="{ row, column }">
                    <GridCell
                        editing-allowed
                        action-cell
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
                        action-cell
                        :row="row"
                        :column="column"
                        :editing="Boolean(selectedRows[row - 1])"
                        @edit="(value) => onSelectRow({ row: row - 1, value })">
                        <GridPresentationCheckCell
                            :value="selectedRows[row - 1]"
                            @input="(value) => onSelectRow({ row: row - 1, value })" />
                    </GridCell>
                </template>
                <template #cell="{ column, columnIndex, rowId, rowIndex, cellData }">
                    <GridCell
                        :key="rowId"
                        :row="rowIndex"
                        :column="columnIndex"
                        :locked="isColumnTypeText(column.type) || !isEditingAllowed"
                        :action-cell="!isColumnTypeText(column.type)"
                        :editing-allowed="!isColumnTypeText(column.type) && isEditingAllowed"
                        :is-selected="cellData"
                        @edit="onValueChange(rowId, column.id, cellData)">
                        <Component
                            :is="getCellComponent(column.type, rowId)"
                            :style="{ justifyContent: 'start' }"
                            :row="rowIndex"
                            :value="cellData.value"
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
import gridModule from '@Core/reusableStore/grid/state';
import { getMappedGridData } from '~/model/mappers/privilegesMapper';
import { COLUMN_TYPE } from '@Core/defaults/grid';
import { STATE } from '@Core/defaults/inputs/checkbox';
import Grid from '@Core/components/Grid/Grid';
import GridCell from '@Core/components/Grid/GridCell';
import GridPresentationHintCell from '@Core/components/Grid/PresentationCells/GridPresentationHintCell';
import GridPresentationCell from '@Core/components/Grid/PresentationCells/GridPresentationCell';
import GridPresentationCheckCell from '@Core/components/Grid/PresentationCells/GridPresentationCheckCell';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

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
        };
    },
    async beforeCreate() {
        this.editRoute = {
            path: '',
            name: '',
        };
        this.isEditingAllowed = this.$hasAccess(['USER_ROLE_UPDATE']);
        this.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store: this.$store,
        });

        const { privileges: privilegesDictionary } = this.$store.state.data;
        const { privileges } = this.$store.state.roles;
        const {
            rows, columns, columnWidths, descriptions,
        } = getMappedGridData(privilegesDictionary, privileges);

        this.descriptions = descriptions;

        await this.$store.dispatch('privilegesGrid/setGridData', { columns, rows });
        await this.$store.dispatch('privilegesGrid/setColumnWidths', columnWidths);
    },
    beforeDestroy() {
        this.$store.unregisterModule('privilegesGrid');

        delete this.editRoute;
        delete this.isEditingAllowed;
    },
    computed: {
        ...mapState('privilegesGrid', {
            rowIds: (state) => state.rowIds,
            cellValues: (state) => state.cellValues,
        }),
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
    mounted() {
        this.initializeRowsSelections();
    },
    methods: {
        ...mapActions('privilegesGrid', [
            'updateDataCellValue',
        ]),
        onSelectRow({ row, value }) {
            this.selectedRows[row] = +value;
            this.selectedRows = { ...this.selectedRows };

            this.updateDataCellValues(row, value);
        },
        onSelectAllRows(value) {
            this.selectEveryRowValues(value);
        },
        onValueChange(rowId, columnId, cellData) {
            const value = !cellData.value;

            if (columnId !== 'read' && value) {
                this.updateDataCellValue({ rowId, columnId, value: true });
                this.updateDataCellValue({ rowId, columnId: 'read', value: true });
            }

            if (columnId === 'read') {
                this.updateDataCellValue({ rowId, columnId: 'create', value: false });
                this.updateDataCellValue({ rowId, columnId: 'update', value: false });
                this.updateDataCellValue({ rowId, columnId: 'delete', value: false });
            }

            this.updateDataCellValue({ rowId, columnId, value });
            this.selectRowValues(rowId);
        },
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
        updateDataCellValues(rowId, isSelected) {
            this.updateDataCellValue({ rowId, columnId: 'read', value: isSelected });
            this.updateDataCellValue({ rowId, columnId: 'create', value: isSelected });
            this.updateDataCellValue({ rowId, columnId: 'update', value: isSelected });
            this.updateDataCellValue({ rowId, columnId: 'delete', value: isSelected });
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
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store,
        });
    },
};
</script>
