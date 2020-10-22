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
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import DatePicker from '@Core/components/DatePicker/DatePicker';
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditFilterCellMixin from '@Core/mixins/grid/cell/gridEditFilterCellMixin';
import {
    DEFAULT_FORMAT,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';

export default {
    name: 'GridDateEditFilterCell',
    components: {
        GridSelectEditContentCell,
        DatePicker,
    },
    mixins: [
        gridEditFilterCellMixin,
    ],
    props: {
        /**
         * Date format used for parsing value
         */
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
    },
    data() {
        let localValue = null;

        if (this.value[FILTER_OPERATOR.EQUAL]) {
            localValue = parseDate(this.value[FILTER_OPERATOR.EQUAL], this.format, new Date());
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

        if (localValue !== this.value[FILTER_OPERATOR.EQUAL]) {
            this.$emit('filter-value', {
                value: {
                    [FILTER_OPERATOR.EQUAL]: localValue,
                },
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
    },
};
</script>
