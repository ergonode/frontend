/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <DatePicker
                v-model="localValue"
                :size="smallSize"
                autofocus
                :placeholder="format"
                :disabled="disabled"
                :format="format"
                :error-messages="errorMessages"
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import DatePicker from '@Core/components/Inputs/DatePicker/DatePicker';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';

export default {
    name: 'GridDateEditCell',
    components: {
        GridSelectEditContentCell,
        DatePicker,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
    },
    data() {
        let localValue = null;

        if (this.value) {
            localValue = parseDate(this.value, this.format, new Date());
        }

        return {
            localValue,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        const localValue = this.localValue ? formatDate(this.localValue, DEFAULT_FORMAT) : '';

        if (localValue !== this.value) {
            this.$emit('cell-value', [
                {
                    value: localValue,
                    rowId: this.rowId,
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                },
            ]);
        }
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
    },
};
</script>
