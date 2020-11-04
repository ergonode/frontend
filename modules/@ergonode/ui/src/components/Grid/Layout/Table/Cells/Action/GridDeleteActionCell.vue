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
        @mousedown.native="onDelete"
        @edit="onDelete">
        <IconDelete v-once />
    </GridTableCell>
</template>

<script>
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import GridTableCell from '@UI/components/Grid/Layout/Table/Cells/GridTableCell';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';

export default {
    name: 'GridDeleteActionCell',
    components: {
        GridTableCell,
        IconDelete,
    },
    props: {
        /**
         * Determines if component is selected
         */
        isSelected: {
            type: Boolean,
            default: false,
        },
        /**
         * URL of backend endpoint
         */
        href: {
            type: String,
            required: true,
        },
        /**
         * Index of the column
         */
        column: {
            type: Number,
            required: true,
        },
        /**
         * Index of the row
         */
        row: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onDelete() {
            // TODO: Migrate it to Core and propagate action outside
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: 'Are you sure you want to remove this row?',
                applyTitle: 'YES, I\'M SURE',
                action: async () => {
                    try {
                        await this.$axios.$delete(this.href, {
                            baseURL: '',
                        });

                        const element = document.documentElement.querySelector(`.coordinates-${this.column}-${this.row - 1}`);

                        if (element) {
                            element.focus();
                        }

                        this.$emit('action', {
                            key: 'delete',
                            value: null,
                        });
                    } catch (e) {
                        if (this.$axios.isCancel(e)) {
                            return;
                        }

                        this.$emit('error');
                    }
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
