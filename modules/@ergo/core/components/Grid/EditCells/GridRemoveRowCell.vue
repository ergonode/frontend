/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="column"
        :row="row"
        :selected="isSelected"
        @edit="onRemove">
        <IconDelete />
    </GridTableCell>
</template>

<script>
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridRemoveRowCell',
    components: {
        GridTableCell,
        IconDelete,
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
        index: {
            type: Number,
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onRemove() {
            if (this.link) {
                const isConfirmed = confirm('Are you sure you want to remove this row?'); /* eslint-disable-line no-restricted-globals */

                if (isConfirmed) {
                    this.$axios.$delete(this.link.href, { baseURL: '' }).then(() => {
                        const element = document.documentElement.querySelector(`.coordinates-${this.column}-${this.row - 1}`);

                        if (element) {
                            element.focus();
                        }

                        this.$emit('remove', this.index);
                    });
                }
            }
        },
    },
};
</script>
