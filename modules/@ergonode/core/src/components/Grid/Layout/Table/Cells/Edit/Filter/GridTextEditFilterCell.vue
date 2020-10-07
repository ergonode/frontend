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
                :type="underlineInputType" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import TextField from '@Core/components/TextField/TextField';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import gridEditFilterCellMixin from '@Core/mixins/grid/cell/gridEditFilterCellMixin';

export default {
    name: 'GridTextEditFilterCell',
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
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (this.localValue !== this.value[FILTER_OPERATOR.EQUAL]) {
            this.$emit('filterValue', {
                value: {
                    [FILTER_OPERATOR.EQUAL]: this.localValue,
                },
                columnId: this.columnId,
                row: this.row,
                column: this.column,
            });
        }
    },
};
</script>
