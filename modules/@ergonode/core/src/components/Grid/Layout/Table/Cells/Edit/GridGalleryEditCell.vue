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
                    height="181px"
                    :disabled="disabled"
                    :multiple="true" />
            </GridImageEditContentCell>
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridImageEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'GridGalleryEditCell',
    components: {
        UploadImageFile,
        GridSelectEditContentCell,
        GridImageEditContentCell,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        /**
         * Component value
         */
        value: {
            type: Array,
            default: () => [],
        },
    },
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
        if (!arraysAreEqual(this.localValue, this.value)) {
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
