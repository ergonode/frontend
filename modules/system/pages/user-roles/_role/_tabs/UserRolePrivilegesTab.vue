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
import gridModule from '~/reusableStore/grid/state';
import { getMappedGridData } from '~/model/mappers/privilegesMapper';
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
                    this.updateDataCellValue({ rowId, columnId, editValue: true });
                    this.updateDataCellValue({ rowId, columnId: 'read', editValue: true });
                }

                if (columnId === 'read') {
                    this.updateDataCellValue({ rowId, columnId: 'create', editValue: false });
                    this.updateDataCellValue({ rowId, columnId: 'update', editValue: false });
                    this.updateDataCellValue({ rowId, columnId: 'delete', editValue: false });
                }

                this.updateDataCellValue({ rowId, columnId, editValue: value });
                this.selectRowValues(rowId);
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
            this.updateDataCellValue({ rowId, columnId: 'read', editValue: isSelected });
            this.updateDataCellValue({ rowId, columnId: 'create', editValue: isSelected });
            this.updateDataCellValue({ rowId, columnId: 'update', editValue: isSelected });
            this.updateDataCellValue({ rowId, columnId: 'delete', editValue: isSelected });
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
