/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell
        :key-code="27"
        @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <TextArea
                height="134px"
                v-model="localValue"
                :autofocus="true"
                :type="underlineInputType"
                :error-messages="errorMessages"
                resize="none" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import TextArea from '@Core/components/Inputs/TextArea';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';

export default {
    name: 'GridTextAreaEditCell',
    components: {
        GridTextEditContentCell,
        TextArea,
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
            this.$emit('cellValue', {
                value: this.localValue,
                rowId: this.rowId,
                columnId: this.columnId,
                row: this.row,
                column: this.column,
            });
        }
    },
};
</script>
