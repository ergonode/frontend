/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="privilegesGrid"
                :edit-route="editRoute"
                :editing-privilege-allowed="false"
                :edit-column="false"
                :select-column="false"
                title="Privileges">
                <template #cell="{ column, columnIndex, rowId, rowIndex, cellData }">
                    <GridCell
                        :key="rowId"
                        :editing-allowed="false"
                        :action-cell="false"
                        :column="columnIndex"
                        :row="rowIndex"
                        :locked="true">
                        <Component
                            :is="getCellComponent(column.type, rowId)"
                            :style="{ justifyContent: 'start' }"
                            :row="rowIndex"
                            :value="cellData.value"
                            :hint="descriptions[rowId]"
                            :disabled="true" />
                    </GridCell>
                </template>
            </Grid>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import { getMappedGridData } from '~/model/mappers/privilegesMapper';
import { COLUMN_TYPE } from '~/defaults/grid';
import { STATE } from '~/defaults/inputs/checkbox';
import Grid from '~/components/Grid/Grid';
import GridCell from '~/components/Grid/GridCell';
import GridPresentationHintCell from '~/components/Grid/PresentationCells/GridPresentationHintCell';
import GridPresentationCell from '~/components/Grid/PresentationCells/GridPresentationCell';
import GridCheckCell from '~/components/Grid/GridCheckCell';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';

export default {
    name: 'UserPrivilegesGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        GridCell,
        GridCheckCell,
        GridPresentationCell,
        Grid,
    },
    data() {
        return {
            selectedRows: {},
            descriptions: {},
        };
    },
    async beforeCreate() {
        this.editRoute = {
            path: '',
            name: '',
        };
        this.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store: this.$store,
        });

        const { privileges: privilegesDictionary } = this.$store.state.data;
        const { privileges } = this.$store.state.authentication.user;
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
    },
    computed: {
        ...mapState('privilegesGrid', {
            rowIds: (state) => state.rowIds,
            cellValues: (state) => state.cellValues,
        }),
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

            return GridCheckCell;
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
