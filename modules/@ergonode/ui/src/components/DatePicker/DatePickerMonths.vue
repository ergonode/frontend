/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-months">
        <DatePickerContentHeader :headers="['Months']" />
        <div class="date-picker-months__nodes">
            <DatePickerNode
                v-for="(node, index) in months"
                :key="node"
                :selected="isSelectedMonth(node)"
                :current="isCurrentDate(node)"
                :within-range="isWithinRange(node, index)"
                :title="node"
                @click.native="onClick(node)" />
        </div>
    </div>
</template>

<script>
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import DatePickerContentHeader from '@UI/components/DatePicker/DatePickerContentHeader';
import DatePickerNode from '@UI/components/DatePicker/Node/DatePickerNode';
import {
    CALENDAR_MONTHS,
    getParsedDate,
} from '@UI/models/calendar';

export default {
    name: 'DatePickerMonths',
    components: {
        DatePickerContentHeader,
        DatePickerNode,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Date,
            default: null,
        },
        /**
         * The value from/to which is selection - displayed as lighted color between range to - from
         */
        rangeValue: {
            type: Date,
            default: null,
        },
        /**
         * Chosen year
         */
        year: {
            type: Number,
            required: true,
        },
    },
    computed: {
        today() {
            return new Date();
        },
        parsedValue() {
            return getParsedDate(this.value);
        },
        parsedRangeValue() {
            return getParsedDate(this.rangeValue);
        },
        currentMonth() {
            return this.getShortMonth(this.today);
        },
        parsedYear() {
            if (this.value) {
                return this.value.getFullYear();
            }

            return null;
        },
        months() {
            return Object.values(CALENDAR_MONTHS);
        },
        parsedMonth() {
            if (!this.value || this.year !== this.parsedYear) {
                return '';
            }

            return this.getShortMonth(this.value);
        },
        parsedRangeMonth() {
            if (!this.rangeValue) {
                return '';
            }

            return this.getShortMonth(this.rangeValue);
        },
    },
    methods: {
        onClick(month) {
            this.$emit('select', month);
        },
        getShortMonth(date) {
            const shortMonth = date.toLocaleString('en-GB', {
                month: 'short',
            });

            return toCapitalize(shortMonth);
        },
        isSelectedMonth(month) {
            if (this.rangeValue) {
                return (this.year === this.parsedRangeValue.year && this.parsedRangeMonth === month)
                    || (this.year === this.parsedValue.year && this.parsedMonth === month);
            }

            return this.parsedMonth === month;
        },
        isCurrentDate(month) {
            return toCapitalize(this.currentMonth) === month
                && this.year === this.today.getFullYear();
        },
        isWithinRange(month, index) {
            if (!(this.parsedRangeValue && this.parsedValue)) {
                return false;
            }

            return (this.year < this.parsedRangeValue.year
                || (this.year === this.parsedRangeValue.year
                    && this.parsedRangeValue.month >= index + 1))
                && (this.year > this.parsedValue.year
                    || (this.year === this.parsedValue.year
                        && this.parsedValue.month <= index + 1));
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker-months {
        display: flex;
        flex-direction: column;

        &__nodes {
            display: grid;
            grid-template-columns: repeat(3, 75px);
            grid-auto-rows: 40px;
            align-items: center;
            justify-items: center;
        }
    }
</style>
