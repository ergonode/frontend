/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <TextField
                v-model="localValue"
                autofocus
                :size="smallSize"
                :disabled="disabled"
                :type="underlineInputType"
                :error-messages="errorMessages" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import GridTextEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import TextField from '@UI/components/TextField/TextField';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridTextEditCell',
    components: {
        GridTextEditContentCell,
        TextField,
    },
    mixins: [
        gridEditCellMixin,
    ],
    computed: {
        positionStyle() {
            const {
                x,
                y,
                width,
                height,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: `${width + 8}px`,
                minHeight: `${height + 8}px`,
            };
        },
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (!this.disabled && this.localValue !== this.value) {
            this.$emit('cell-value', [
                {
                    value: this.localValue,
                    rowId: this.rowId,
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                },
            ]);
        }
    },
};
</script>
