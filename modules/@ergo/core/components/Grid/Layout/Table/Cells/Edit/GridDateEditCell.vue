/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <DatePicker
            :style="{width: `${width}px`, height: `${height}px`}"
            v-model="localValue"
            :size="smallSize"
            autofocus
            :placeholder="format"
            :format="format"
            :error-messages="errorMessages"
            @focus="onFocus" />
    </GridActivatorEditCell>
</template>

<script>
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
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
    inject: [
        'setEditingCellCoordinates',
    ],
    components: {
        GridActivatorEditCell,
        DatePicker,
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
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
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
        if (this.localValue) {
            this.$emit('input', formatDate(this.localValue, this.format));
        } else if (Boolean(this.localValue) !== Boolean(this.value)) {
            this.$emit('input', '');
        }
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                this.setEditingCellCoordinates();
            }
        },
    },
};
</script>
