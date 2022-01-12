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
                :size="smallSize"
                :type="underlineInputType"
                :error-messages="errorMessages" />
            <Paragraph
                v-else
                :title="localValue"
                :size="smallSize" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridTextEditCell',
    mixins: [
        gridEditCellMixin,
    ],
    computed: {
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
