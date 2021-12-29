/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridEditContentCell
            :bounds="bounds"
            :shadow="true"
            :fixed-width="width"
            :fixed-height="height">
            <UploadImageFile
                v-model="localValue"
                :height="`${height}px`"
                :disabled="disabled"
                :size="smallSize"
                :border="false"
                :multiple="true" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    DEFAULT_EDIT_CELL_CONTENT_HEIGHT,
    DEFAULT_EDIT_CELL_CONTENT_WIDTH,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridGalleryEditCell',
    components: {
        UploadImageFile,
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
        height() {
            return DEFAULT_EDIT_CELL_CONTENT_HEIGHT;
        },
        width() {
            return DEFAULT_EDIT_CELL_CONTENT_WIDTH;
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
