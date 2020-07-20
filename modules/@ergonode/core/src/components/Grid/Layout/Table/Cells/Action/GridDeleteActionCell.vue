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
        @mousedown="onDelete"
        @edit="onDelete">
        <IconDelete />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';

export default {
    name: 'GridDeleteActionCell',
    components: {
        GridTableCell,
        IconDelete,
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
        onDelete() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to remove this row?',
                confirmCallback: () => {
                    this.$axios.$delete(this.href, {
                        baseURL: '',
                    }).then(() => {
                        const element = document.documentElement.querySelector(`.coordinates-${this.column}-${this.row - 1}`);

                        if (element) {
                            element.focus();
                        }

                        this.$emit('action', {
                            key: 'delete',
                            value: null,
                        });
                    });
                },
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
