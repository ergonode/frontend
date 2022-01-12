/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
                v-if="!disabled"
                v-model="localValue"
                autofocus
                :alignment="leftAlignment"
                :error-messages="errorMessages"
                :input="{ type: 'number' }"
                :size="smallSize"
                :type="underlineType" />
            <Paragraph
                v-else
                :title="localValue"
                :size="smallSize" />
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
