/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import {
    SIZE,
} from '@Core/defaults/theme';
import GridSelectEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';
import {
    DEFAULT_DATE_TIME_FORMAT,
    DEFAULT_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'GridDateTimeEditCell',
    components: {
        GridSelectEditContentCell,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        /**
         * Date format used for parsing value
         */
        format: {
            type: String,
            default: DEFAULT_DATE_TIME_FORMAT,
        },
        /**
         * Date value
         */
        value: {
            type: [
                Date,
                Object,
            ],
            default: null,
        },
    },
    data() {
        return {
            localValue: this.value,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (!this.disabled) {
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
