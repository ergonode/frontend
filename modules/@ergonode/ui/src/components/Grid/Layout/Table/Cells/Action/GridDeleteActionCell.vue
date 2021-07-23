/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="column"
        :row="row"
        :selected="selected"
        :disabled="disabled"
        :edit-key-code="32"
        @mousedown.native="onDelete"
        @edit="onDelete">
        <IconDelete />
    </GridTableCell>
</template>

<script>
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';

export default {
    name: 'GridDeleteActionCell',
    props: {
        /**
         * Unique row identifier
         */
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Determines if component is selected
         */
        selected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
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
            if (!this.disabled) {
                // TODO: Migrate it to Core and propagate action outside
                this.$confirm({
                    type: MODAL_TYPE.DESTRUCTIVE,
                    title: 'Are you sure you want to remove this row?',
                    applyTitle: 'YES, REMOVE',
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
                                value: this.rowId,
                            });
                        } catch (e) {
                            if (this.$axios.isCancel(e)) {
                                return;
                            }

                            this.$emit('error');
                        }
                    },
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .icon {
        padding: 4px;
    }
</style>
