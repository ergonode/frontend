/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell
        :edit-key-code="27"
        @edit="onEditCell">
        <GridEditContentCell
            :bounds="bounds"
            :shadow="true"
            :centered="true"
            :padding="8"
            :fixed-width="width"
            :fixed-height="height">
            <RichTextEditor
                v-if="isRichEdit"
                :style="{ height: `${height}px` }"
                :value="localValue"
                :disabled="disabled"
                :autofocus="true"
                :type="underlineInputType"
                @blur="onRTEValueChange" />
            <TextArea
                v-else
                :height="`${height}px`"
                v-model="localValue"
                :autofocus="true"
                :disabled="disabled"
                :type="underlineInputType"
                :error-messages="errorMessages"
                resize="none" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    DEFAULT_EDIT_CELL_CONTENT_WIDTH,
    DEFAULT_LARGE_EDIT_CELL_CONTENT_HEIGHT,
} from '@Core/defaults/grid';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridTextAreaEditCell',
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        isRichEdit: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        height() {
            return DEFAULT_LARGE_EDIT_CELL_CONTENT_HEIGHT;
        },
        width() {
            return DEFAULT_EDIT_CELL_CONTENT_WIDTH;
        },
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
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
    methods: {
        onRTEValueChange(value) {
            if (this.localValue !== value) {
                this.localValue = value;
            }
        },
    },
};
</script>
