/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="column"
        :row="row"
        :selected="isSelected"
        :edit-key-code="32"
        @mousedown.native="onEdit"
        @edit="onEdit">
        <IconEdit />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import IconEdit from '@Core/components/Icons/Actions/IconEdit';

export default {
    name: 'GridEditActionCell',
    components: {
        GridTableCell,
        IconEdit,
    },
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        },
        href: {
            type: String,
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
            const args = this.href.split('/');

            this.$emit('action', {
                key: 'edit',
                value: args,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .icon {
        padding: 4px;
    }
</style>
