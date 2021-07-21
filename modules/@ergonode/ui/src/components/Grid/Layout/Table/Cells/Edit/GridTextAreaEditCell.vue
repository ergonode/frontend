/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell
        :edit-key-code="27"
        @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <RichTextEditor
                v-if="isRichEdit"
                :style="{height: '134px'}"
                :value="localValue"
                :disabled="disabled"
                :autofocus="true"
                :type="underlineInputType"
                @blur="onRTEValueChange" />
            <TextArea
                v-else
                height="134px"
                v-model="localValue"
                :autofocus="true"
                :disabled="disabled"
                :type="underlineInputType"
                :error-messages="errorMessages"
                resize="none" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';
import GridTextEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridTextAreaEditCell',
    components: {
        GridTextEditContentCell,
    },
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
