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
                v-model="localValue"
                autofocus
                :alignment="leftAlignment"
                :input="{ type: 'number' }"
                :size="smallSize"
                :type="underlineType" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import gridEditFilterCellMixin from '@UI/mixins/grid/gridEditFilterCellMixin';

export default {
    name: 'GridNumericEditFilterCell',
    mixins: [
        gridEditFilterCellMixin,
    ],
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
        if (String(this.localValue) !== String(this.value[FILTER_OPERATOR.EQUAL])) {
            if (this.localValue === '') {
                this.$emit('filter-clear', this.columnId);
            } else {
                this.$emit('filter-value', {
                    value: {
                        [FILTER_OPERATOR.EQUAL]: +this.localValue,
                    },
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                });
            }
        }
    },
};
</script>
