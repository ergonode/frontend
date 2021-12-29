/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridEditContentCell :bounds="bounds">
            <DatePicker
                v-model="localValue"
                :size="smallSize"
                autofocus
                :placeholder="format"
                :format="format"
                @focus="onFocus" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditFilterCellMixin from '@UI/mixins/grid/gridEditFilterCellMixin';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';

export default {
    name: 'GridDateTimeEditFilterCell',
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
            if (this.localValue === '') {
                this.$emit('filter-clear', this.columnId);
            } else {
                this.$emit('filter-value', {
                    value: {
                        [FILTER_OPERATOR.EQUAL]: localValue,
                    },
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                });
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
