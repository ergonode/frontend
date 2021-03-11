/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="column"
        :row="row"
        :selected="selected"
        :edit-key-code="32"
        :disabled="disabled"
        @mousedown.native="onPreview"
        @edit="onPreview">
        <IconPreview v-once />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@UI/components/Grid/Layout/Table/Cells/GridTableCell';
import IconPreview from '@UI/components/Icons/Actions/IconPreview';

export default {
    name: 'GridGetActionCell',
    components: {
        GridTableCell,
        IconPreview,
    },
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
        onPreview(event) {
            if (event.which === 3) {
                return;
            }

            if (!this.disabled) {
                const args = this.href.split('/');

                this.$emit('action', {
                    key: 'preview',
                    value: args,
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
