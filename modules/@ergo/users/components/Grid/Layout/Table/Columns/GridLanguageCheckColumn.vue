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
import { mapActions } from 'vuex';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import GridHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell';

export default {
    name: 'GridLanguageCheckColumn',
    components: {
        GridColumn,
        GridHeaderCell,
    },
    inheritAttrs: false,
    methods: {
        ...mapActions('grid', [
            'setDraftValue',
        ]),
        onValueChange({ rowId, columnId, value }) {
            if (columnId !== 'preview' && value) {
                this.setDraftValue({
                    rowId,
                    columnId,
                    value: false,
                });
                this.setDraftValue({
                    rowId,
                    columnId: 'preview',
                    value: true,
                });
            }
            if (columnId === 'preview') {
                this.setDraftValue({
                    rowId,
                    columnId: 'edit',
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
