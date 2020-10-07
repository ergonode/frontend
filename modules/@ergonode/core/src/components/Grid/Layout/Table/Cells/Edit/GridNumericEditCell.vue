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
                :alignment="leftAlignment"
                :disabled="disabled"
                :error-messages="errorMessages"
                :input="{ type: 'number' }"
                :size="smallSize"
                :type="underlineType" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import TextField from '@Core/components/TextField/TextField';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';

export default {
    name: 'GridNumericEditCell',
    components: {
        GridTextEditContentCell,
        TextField,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        value: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
    },
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
        underlineType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        leftAlignment() {
            return ALIGNMENT.LEFT;
        },
    },
    beforeDestroy() {
        if (String(this.localValue) !== String(this.value)) {
            this.$emit('cell-value', [
                {
                    value: this.localValue !== '' ? +this.localValue : '',
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
