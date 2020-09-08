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
        @mousedown.native="onPreview"
        @edit="onPreview">
        <IconPreview />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import IconPreview from '@Core/components/Icons/Actions/IconPreview';

export default {
    name: 'GridGetActionCell',
    components: {
        GridTableCell,
        IconPreview,
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
        onPreview() {
            const args = this.href.split('/');

            this.$emit('action', {
                key: 'preview',
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
