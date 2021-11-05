/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                :disabled="disabled"
                object-fit="contain"
                :size="smallSize"
                :border="false"
                :height="`${height}px`" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridImageEditCell',
    components: {
        UploadImageFile,
    },
    mixins: [
        gridEditCellMixin,
    ],
    computed: {
        height() {
            return 181;
        },
        width() {
            return 304;
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
