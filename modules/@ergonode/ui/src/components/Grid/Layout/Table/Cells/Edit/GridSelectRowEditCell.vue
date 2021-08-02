/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="0"
        :row="row"
        editing-allowed
        :edit-key-code="32"
        :selected="selected"
        :disabled="disabled"
        @mousedown.native="onSelect"
        @edit="onSelect">
        <GridRadioEditCell
            :value="selected"
            :disabled="disabled" />
    </GridTableCell>
</template>

<script>
import GridRadioEditCell from '@UI/components/Grid/Layout/Table/Cells/Edit/GridRadioEditCell';

export default {
    name: 'GridSelectRowEditCell',
    components: {
        GridRadioEditCell,
    },
    props: {
        /**
         * Index of the row
         */
        row: {
            type: Number,
            required: true,
        },
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
         * Determines if component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onSelect() {
            if (!this.disabled) {
                this.$emit('select', {
                    row: this.rowId,
                    selected: !this.selected,
                });
            }
        },
    },
};
</script>
