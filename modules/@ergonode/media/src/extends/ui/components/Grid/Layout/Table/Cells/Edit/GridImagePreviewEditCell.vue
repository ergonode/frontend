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
                v-if="type === 'image'"
                v-model="localValue"
                :disabled="disabled"
                object-fit="contain"
                :size="smallSize"
                :border="false"
                :height="`${height}px`" />
            <IconFile
                :style="{ height: `${height}px` }"
                v-else />
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
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridImagePreviewEditCell',
    components: {
        UploadImageFile,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        type: {
            type: String,
            required: true,
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
