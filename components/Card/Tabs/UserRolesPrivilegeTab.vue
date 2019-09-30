/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <GridWrapper
                store-namespace="privilegesGrid"
                :rows-height="32"
                :is-draft="false"
                :action-paths="actionPaths"
                :filterable="false">
                <template #cell="{column, columnIndex}">
                    <GridCell
                        v-for="(rowId, rowIndex) in rowIds"
                        :key="rowId"
                        :row="rowIndex + 1"
                        :column="columnIndex"
                        :locked="isColumnTypeText(column) || !isEditingAllowed"
                        :action-cell="!isColumnTypeText(column)"
                        :editing-allowed="!isColumnTypeText(column) && isEditingAllowed"
                        :is-selected="cellValues[rowId][column.id]"
                        @edit="onValueChange(rowId, column.id)">
                        <Component
                            :is="getComponentByColumnType(column)"
                            :row="rowIndex + 1"
                            :value="cellValues[rowId][column.id].value"
                            :disabled="!isEditingAllowed"
                            @input="onValueChange(rowId, column.id)" />
                    </GridCell>
                </template>
            </GridWrapper>
        </div>
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import GridWrapper from '~/components/Grid/Wrappers/GridWrapper';
import { getMappedGridData } from '~/model/mappers/privilegesMapper';
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
        GridWrapper,
        Footer,
    },
    async beforeCreate() {
        this.actionPaths = {
            getData: '',
            routerEdit: '',
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

        delete this.actionPaths;
        delete this.isEditingAllowed;
    },
    computed: {
        ...mapState('privilegesGrid', {
            rowIds: state => state.rowIds,
            cellValues: state => state.cellValues,
        }),
    },
    methods: {
        ...mapActions('privilegesGrid', [
            'updateDataCellValue',
            'reloadGridData',
        ]),
        onValueChange(rowId, columnId) {
            const value = !this.cellValues[rowId][columnId].value;

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
            if (type === 'TEXT') return GridInfoCell;

            return GridCheckCell;
        },
        isColumnTypeText({ type }) {
            return type === 'TEXT';
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
        background-color: $white;

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            margin: 12px 12px 0;
            overflow: hidden;
        }
    }
</style>
