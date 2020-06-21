/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        @editCell="onValueChange">
        <template #header="{ title }">
            <GridHeaderCell :title="title" />
        </template>
    </GridColumn>
</template>

<script>
import GridHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridPrivilegeCheckColumn',
    components: {
        GridColumn,
        GridHeaderCell,
    },
    inheritAttrs: false,
    methods: {
        ...mapActions('grid', [
            'setDraftValue',
        ]),
        onValueChange({
            rowId, columnId, value,
        }) {
            if (columnId !== 'read' && value) {
                this.setDraftValue({
                    rowId,
                    columnId,
                    value: false,
                });
                this.setDraftValue({
                    rowId,
                    columnId: 'read',
                    value: true,
                });
            }

            if (columnId === 'read') {
                this.setDraftValue({
                    rowId,
                    columnId: 'create',
                    value: false,
                });
                this.setDraftValue({
                    rowId,
                    columnId: 'update',
                    value: false,
                });
                this.setDraftValue({
                    rowId,
                    columnId: 'delete',
                    value: false,
                });
            }

            this.setDraftValue({
                rowId,
                columnId,
                value,
            });
        },
    },
};
</script>
