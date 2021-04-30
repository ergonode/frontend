/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <GridImageEditContentCell>
                <UploadImageFile
                    v-model="localValue"
                    :disabled="disabled"
                    object-fit="contain"
                    :size="smallSize"
                    :height="`${cellHeight}px`" />
            </GridImageEditContentCell>
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import GridImageEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import GridSelectEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridImageEditCell',
    components: {
        UploadImageFile,
        GridSelectEditContentCell,
        GridImageEditContentCell,
    },
    inject: [
        'getGridTableLayoutReference',
    ],
    mixins: [
        gridEditCellMixin,
    ],
    computed: {
        cellHeight() {
            return 181;
        },
        positionStyle() {
            const {
                x,
                y,
                height,
            } = this.bounds;

            const {
                scrollTop,
                offsetHeight,
            } = this.getGridTableLayoutReference();

            const yPos = offsetHeight + scrollTop - y - height > this.cellHeight
                ? y
                : y - this.cellHeight + height;

            return {
                top: `${yPos}px`,
                left: `${x}px`,
                width: '304px',
            };
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
