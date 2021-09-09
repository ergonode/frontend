/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <GridImageEditContentCell>
                <UploadFiles
                    v-model="localValue"
                    height="181px"
                    :disabled="disabled"
                    :size="smallSize"
                    :multiple="true" />
            </GridImageEditContentCell>
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import UploadFiles from '@Media/components/Inputs/UploadFile/UploadFiles';
import GridImageEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import GridSelectEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridFileEditCell',
    components: {
        UploadFiles,
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
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (!this.disabled && !arraysAreEqual(this.localValue, this.value)) {
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
