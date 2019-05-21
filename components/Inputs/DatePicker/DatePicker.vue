/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker">
        <DatePickerNavigationHeader :header="displayingMonthAndYear">
            <Button
                slot="previous"
                icon="arrow-dart trans-quarter"
                fab
                color="transparent"
                ripple-color="rgba(235, 235, 236, 1)"
                @click.native="previousMonth" />
            <Button
                slot="next"
                icon="arrow-dart trans-three-fourth"
                fab
                color="transparent"
                ripple-color="rgba(235, 235, 236, 1)"
                @click.native="nextMonth" />
        </DatePickerNavigationHeader>
        <DatePickerWeekDays :days="weekDays" />
        <DatePickerMonthDays
            :dates="calendarDates"
            :selected-dates="parsedDate"
            @select="onSelect" />
    </div>
</template>

<script>
import Button from '~/components/Buttons/Button';
import DatePickerMonthDays from '~/components/Inputs/DatePicker/DatePickerMonthDays';
import DatePickerWeekDays from '~/components/Inputs/DatePicker/DatePickerWeekDays';
import DatePickerNavigationHeader from '~/components/Inputs/DatePicker/DatePickerNavigationHeader';
import calendar, {
    getNextMonth,
    getPreviousMonth,
    WEEK_DAYS,
    CALENDAR_MONTHS,
} from '~/model/calendar/calendar';

export default {
    name: 'DatePicker',
    components: {
        Button,
        DatePickerMonthDays,
        DatePickerWeekDays,
        DatePickerNavigationHeader,
    },
    props: {
        value: {
            type: Date,
            required: false,
            default: null,
        },
    },
    data() {
        const today = new Date();

        return {
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        };
    },
    computed: {
        displayingMonthAndYear() {
            return `${this.displayingMonth} ${this.year}`;
        },
        displayingMonth() {
            return Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(this.month - 1, 11))];
        },
        weekDays() {
            return Object.values(WEEK_DAYS);
        },
        calendarDates() {
            return calendar(this.month, this.year);
        },
        parsedDate() {
            if (this.value) {
                return [
                    new Date(this.value),
                ];
            }

            return [];
        },
    },
    methods: {
        previousMonth() {
            const { month, year } = getPreviousMonth(this.month, this.year);

            this.month = month;
            this.year = year;
        },
        nextMonth() {
            const { month, year } = getNextMonth(this.month, this.year);

            this.month = month;
            this.year = year;
        },
        onSelect(date) {
            this.$emit('input', new Date(date.year, date.month - 1, date.day));
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker {
        padding: 16px;
    }
</style>
