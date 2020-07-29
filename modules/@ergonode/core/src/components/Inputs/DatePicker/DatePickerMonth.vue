/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-month">
        <DatePickerContentHeader :headers="weekDays" />
        <div class="date-picker-month__nodes">
            <DatePickerNode
                v-for="node in nodes"
                :key="`${node.year}|${node.month}|${node.day}`"
                :selected="isSelectedDate(node)"
                :disabled="node.disabled"
                :within-range="isWithinRange(node)"
                :current="isCurrentDate(node)"
                :title="node.day"
                @click.native="onSelectDate(node)" />
        </div>
    </div>
</template>

<script>
import DatePickerContentHeader from '@Core/components/Inputs/DatePicker/DatePickerContentHeader';
import DatePickerNode from '@Core/components/Inputs/DatePicker/Node/DatePickerNode';
import calendar, {
    getParsedDate,
    isEqual,
    WEEK_DAYS,
} from '@Core/models/calendar/calendar';
import {
    isWithinInterval,
} from 'date-fns';

export default {
    name: 'DatePickerMonth',
    components: {
        DatePickerNode,
        DatePickerContentHeader,
    },
    props: {
        value: {
            type: Date,
            default: null,
        },
        rangeValue: {
            type: Date,
            default: null,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    computed: {
        nodes() {
            return calendar(this.month, this.year);
        },
        parsedValue() {
            return getParsedDate(this.value);
        },
        parsedRangeValue() {
            return getParsedDate(this.rangeValue);
        },
        today() {
            return getParsedDate(new Date());
        },
        weekDays() {
            return Object.values(WEEK_DAYS);
        },
    },
    methods: {
        onSelectDate(date) {
            this.$emit('select', date);
        },
        isSelectedDate(date) {
            if (!this.parsedValue) {
                return false;
            }

            return isEqual(this.parsedValue, date)
                || (this.parsedRangeValue && isEqual(this.parsedRangeValue, date));
        },
        isCurrentDate(date) {
            return isEqual(this.today, date);
        },
        isWithinRange(date) {
            if (!(this.parsedRangeValue && this.parsedValue)) {
                return false;
            }

            return isWithinInterval(new Date(date.year, date.month - 1, date.day), {
                start: this.value,
                end: this.rangeValue,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker-month {
        display: flex;
        flex-direction: column;

        &__nodes {
            display: grid;
            grid-template-columns: repeat(7, 32px);
            grid-template-rows: repeat(6, 32px);
            justify-items: center;
            align-items: center;
        }
    }
</style>
