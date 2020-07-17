/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        @editCell="onValueChange" />
</template>

<script>
import GridTitleHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridTitleHeaderCell';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridLanguageCheckColumn',
    components: {
        GridColumn,
        GridTitleHeaderCell,
    },
    inheritAttrs: false,
    methods: {
        ...mapActions('grid', [
            'setDrafts',
        ]),
        onValueChange({
            rowId, columnId, value,
        }) {
            const drafts = {
                [rowId]: {},
            };

            if (columnId !== 'read' && value) {
                drafts[rowId] = {
                    [columnId]: false,
                    read: true,
                };
            }
            if (columnId === 'read') {
                drafts[rowId] = {
                    ...drafts[rowId],
                    edit: false,
                };
            }
            drafts[rowId] = {
                ...drafts[rowId],
                [columnId]: value,
            };

            this.setDrafts(drafts);
        },
    },
};
</script>
