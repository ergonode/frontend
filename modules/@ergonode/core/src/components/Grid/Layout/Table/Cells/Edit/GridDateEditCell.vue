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
                :format="format"
                :error-messages="errorMessages"
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import GridEditNavigationCell from '@Core/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';
import DatePicker from '@Core/components/Inputs/DatePicker/DatePicker';
import {
    SIZE,
} from '@Core/defaults/theme';
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
        GridEditNavigationCell,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
        errorMessages: {
            type: String,
            default: '',
        },
        bounds: {
            type: [
                DOMRect,
                Object,
            ],
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
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
        positionStyle() {
            const {
                x,
                y,
                width,
                height,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: `${width}px`,
                height: `${height}px`,
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (this.localValue) {
            this.$emit('cellValue', {
                value: formatDate(this.localValue, DEFAULT_FORMAT),
                rowId: this.rowId,
                columnId: this.columnId,
                row: this.row,
                column: this.column,
            });
        } else if (Boolean(this.localValue) !== Boolean(this.value)) {
            this.$emit('cellValue', {
                value: '',
                rowId: this.rowId,
                columnId: this.columnId,
                row: this.row,
                column: this.column,
            });
        }
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
        onEditCell() {
            this.$emit('dismiss');
        },
    },
};
</script>
