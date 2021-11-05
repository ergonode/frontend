/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridEditContentCell
            :bounds="bounds"
            :padding="8"
            :centered="true"
            :shadow="true">
            <TextField
                v-model="localValue"
                autofocus
                :alignment="leftAlignment"
                :disabled="disabled"
                :error-messages="errorMessages"
                :input="{ type: 'number' }"
                :size="smallSize"
                :type="underlineType" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridNumericEditCell',
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        /**
         * Component value
         */
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
        if (!this.disabled && String(this.localValue) !== String(this.value)) {
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
