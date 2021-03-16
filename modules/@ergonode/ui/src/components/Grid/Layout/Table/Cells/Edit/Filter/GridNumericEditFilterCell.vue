/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <TextField
                v-model="localValue"
                autofocus
                :alignment="leftAlignment"
                :input="{ type: 'number' }"
                :size="smallSize"
                :type="underlineType" />
        </GridTextEditContentCell>
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
import GridTextEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import TextField from '@UI/components/TextField/TextField';
import gridEditFilterCellMixin from '@UI/mixins/grid/gridEditFilterCellMixin';

export default {
    name: 'GridNumericEditFilterCell',
    components: {
        GridTextEditContentCell,
        TextField,
    },
    mixins: [
        gridEditFilterCellMixin,
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
            this.$emit('filter-value', {
                value: {
                    [FILTER_OPERATOR.EQUAL]: this.localValue !== '' ? +this.localValue : '',
                },
                columnId: this.columnId,
                row: this.row,
                column: this.column,
            });
        }
    },
};
</script>
