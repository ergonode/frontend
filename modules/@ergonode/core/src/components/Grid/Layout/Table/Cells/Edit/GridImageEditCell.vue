/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                    height="181px" />
            </GridImageEditContentCell>
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridImageEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'GridImageEditCell',
    components: {
        UploadImageFile,
        GridSelectEditContentCell,
        GridImageEditContentCell,
    },
    mixins: [
        gridEditCellMixin,
    ],
    computed: {
        positionStyle() {
            const {
                x,
                y,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: '304px',
            };
        },
    },
    beforeDestroy() {
        if (this.localValue !== this.value) {
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
