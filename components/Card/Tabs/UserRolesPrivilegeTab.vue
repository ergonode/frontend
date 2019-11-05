/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <Grid
                namespace="privilegesGrid"
                :is-draft="false"
                :route-edit="routeEdit"
                :basic-filters="false"
                :extender-column="false"
                :edit-column="false"
                title="Role privileges"
                @selectRows="onSelectRows"
                @selectAllRows="onSelectAllRows">
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
                            :is="getComponentByColumnType(column)"
                            :row="rowIndex"
                            :value="cellData.value"
                            :disabled="!isEditingAllowed"
                            @input="onValueChange(rowId, column.id, cellData)" />
                    </GridCell>
                </template>
            </Grid>
        </div>
        <Footer :buttons="[...updateButton]" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import { getMappedGridData } from '~/model/mappers/privilegesMapper';
import { COLUMN_TYPE } from '~/defaults/grid';
import Grid from '~/components/Grid/Grid';
import GridCell from '~/components/Grid/GridCell';
import GridInfoCell from '~/components/Grid/GridInfoCell';
import GridCheckCell from '~/components/Grid/GridCheckCell';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'UserRolesPrivilegeTab',
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    components: {
        GridCell,
        GridInfoCell,
        Grid,
        Footer,
    },
    async beforeCreate() {
        this.routeEdit = {
            getData: '',
            name: '',
        };
        this.isEditingAllowed = this.$hasAccess('USER_ROLE_UPDATE');
        this.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store: this.$store,
        });

        const { privileges: privilegesDictionary } = this.$store.state.data;
        const { privileges } = this.$store.state.roles;
        const { rows, columns, columnWidths } = getMappedGridData(privilegesDictionary, privileges);

        await this.$store.dispatch('privilegesGrid/setGridData', { columns, rows });
        await this.$store.dispatch('privilegesGrid/setColumnWidths', columnWidths);
    },
    beforeDestroy() {
        this.$store.unregisterModule('privilegesGrid');

        delete this.routeEdit;
        delete this.isEditingAllowed;
    },
    computed: {
        ...mapState('privilegesGrid', {
            rowIds: (state) => state.rowIds,
        }),
    },
    methods: {
        ...mapActions('privilegesGrid', [
            'updateDataCellValue',
            'reloadGridData',
        ]),
        onSelectRows(rows) {
            this.rowIds.forEach((id) => {
                if (typeof rows[id + 1] !== 'undefined') {
                    console.log(id);
                }
            });

            this.reloadGridData();
        },
        onSelectAllRows() {
            this.reloadGridData();
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

            this.reloadGridData();
        },
        getComponentByColumnType({ type }) {
            if (type === COLUMN_TYPE.TEXT) return GridInfoCell;

            return GridCheckCell;
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

<style lang="scss" scoped>
    .tab {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $WHITE;

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            margin: 24px 24px 0;
            overflow: hidden;
        }
    }
</style>
