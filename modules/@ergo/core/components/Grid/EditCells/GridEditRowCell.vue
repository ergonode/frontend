/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="column"
        :row="row"
        :selected="isSelected"
        @edit="onEdit">
        <IconEdit />
    </GridTableCell>
</template>

<script>
import IconEdit from '@Core/components/Icons/Actions/IconEdit';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridEditRowCell',
    components: {
        GridTableCell,
        IconEdit,
    },
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        },
        link: {
            type: Object,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onEdit() {
            if (this.link) {
                const args = this.link.href.split('/');

                this.$emit('edit', args);
            }
        },
    },
};
</script>
