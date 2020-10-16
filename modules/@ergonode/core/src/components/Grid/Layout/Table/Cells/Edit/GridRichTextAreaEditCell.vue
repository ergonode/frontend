/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell
        :edit-key-code="27"
        @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <RichTextEditor
                :style="{height: '134px'}"
                :value="localValue"
                :disabled="disabled"
                :autofocus="true"
                :type="underlineInputType"
                @blur="onRTEValueChange" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import RichTextEditor from '@Core/components/RichTextEditor/RichTextEditor';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';

export default {
    name: 'GridTextAreaEditCell',
    components: {
        GridTextEditContentCell,
        RichTextEditor,
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
                width: '320px',
            };
        },
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
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
    methods: {
        onRTEValueChange(value) {
            if (this.localValue !== value) {
                this.localValue = value;
            }
        },
    },
};
</script>
