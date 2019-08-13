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
                <template v-slot:cell="{column, columnIndex}">
                    <GridCell
                        v-for="(rowId, rowIndex) in rowIds"
                        :key="rowId"
                        :row="rowIndex + 1"
                        :column="columnIndex"
                        :locked="isColumnTypeText(column)"
                        :action-cell="!isColumnTypeText(column)"
                        :editing-allowed="!isColumnTypeText(column)"
                        :is-selected="cellValues[rowId][column.id]"
                        @edit="onValueChange(rowId, column.id)">
                        <Component
                            :is="getComponentByColumnType(column)"
                            :row="rowIndex + 1"
                            :value="cellValues[rowId][column.id]"
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
        Footer: () => import('~/components/ReusableFooter/Footer'),
    },
    data() {
        return {
            actionPaths: {
                getData: '',
                routerEdit: '',
            },
        };
    },
    async beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store: this.$store,
        });

        const { privileges: privilegesDictionary } = this.$store.state.data;
        const { privileges } = this.$store.state.roles;

        const { rows, columns } = getMappedGridData(privilegesDictionary, privileges);

        await this.$store.dispatch('privilegesGrid/setGridData', { columns, rows });
    },
    computed: {
        ...mapState('privilegesGrid', {
            rowIds: state => state.rowIds,
            cellValues: state => state.cellValues,
        }),
    },
    methods: {
        ...mapActions('privilegesGrid', [
            'updateRowValue',
        ]),
        onValueChange(rowId, columnId) {
            const rolePrivileges = { ...this.cellValues[rowId] };

            if (columnId !== 'read' && !rolePrivileges[columnId]) {
                rolePrivileges.read = true;
            }

            if (columnId === 'read') {
                rolePrivileges.create = false;
                rolePrivileges.update = false;
                rolePrivileges.delete = false;
            }

            rolePrivileges[columnId] = !rolePrivileges[columnId];

            this.updateRowValue({ rowId, value: rolePrivileges });
        },
        getComponentByColumnType({ type }) {
            if (type === 'TEXT') return GridInfoCell;

            return GridCheckCell;
        },
        isColumnTypeText({ type }) {
            return type === 'TEXT';
        },
    },
    beforeDestroy() {
        this.$store.unregisterModule('privilegesGrid');
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
