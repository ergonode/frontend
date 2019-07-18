/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div>
        <template v-if="isCalendarDayType">
            <DatePickerContentHeader :headers="weekDays" />
            <DatePickerMonthDays
                :dates="calendarDates"
                :selected-dates="parsedDate"
                @select="onDateSelect" />
        </template>
        <template v-if="isCalendarMonthType">
            <DatePickerContentHeader :headers="['Months']" />
            <DatePickerMonths
                :months="months"
                :selected-month="parsedSelectedMonth"
                :current-month="parsedCurrentMonth"
                @monthSelected="onMonthSelect" />
        </template>
        <template v-if="isCalendarYearType">
            <DatePickerContentHeader :headers="['Years']" />
            <DatePickerYears
                :years="years"
                :selected-year="parsedSelectedYear"
                :current-year="currentYear"
                @yearSelected="onYearSelect" />
        </template>
    </div>
</template>

<script>
import DatePickerMonthDays from '~/components/Inputs/Date/DatePickerMonthDays';
import DatePickerContentHeader from '~/components/Inputs/Date/DatePickerContentHeader';
import DatePickerMonths from '~/components/Inputs/Date/DatePickerMonths';
import DatePickerYears from '~/components/Inputs/Date/DatePickerYears';
import calendar, {
    getHeaderForCalendarDaysType,
    getMonthIndex,
    WEEK_DAYS,
    CALENDAR_MONTHS,
} from '~/model/calendar/calendar';
import { CalendarType } from '~/model/calendar/CalendarType';

export default {
    name: 'DatePickerCalendarContent',
    components: {
        DatePickerMonthDays,
        DatePickerContentHeader,
        DatePickerMonths,
        DatePickerYears,
    },
    props: {
        date: {
            type: Date,
            default: null,
        },
        year: {
            type: Number,
            required: true,
        },
        years: {
            type: Array,
            required: true,
        },
        currentYear: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        currentMonth: {
            type: Number,
            required: true,
        },
        calendarType: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            months: Object.values(CALENDAR_MONTHS),
        };
    },
    computed: {
        parsedDate() {
            if (this.date) {
                return [
                    new Date(this.date),
                ];
            }

            return [];
        },
        parsedCurrentMonth() {
            if (this.year === this.currentYear) {
                return Object.values(CALENDAR_MONTHS)[this.currentMonth];
            }

            return '';
        },
        parsedSelectedMonth() {
            if (this.parsedDate.length) {
                const [date] = this.parsedDate;

                if (date.getFullYear() === this.year) {
                    return this.months[date.getMonth()];
                }

                return '';
            }

            return '';
        },
        parsedSelectedYear() {
            if (this.parsedDate.length) {
                const [date] = this.parsedDate;

                return date.getFullYear();
            }

            return null;
        },
        weekDays() {
            return Object.values(WEEK_DAYS);
        },
        calendarDates() {
            return calendar(this.month, this.year);
        },
        isCalendarDayType() {
            return this.calendarType === CalendarType.DAY;
        },
        isCalendarMonthType() {
            return this.calendarType === CalendarType.MONTH;
        },
        isCalendarYearType() {
            return this.calendarType === CalendarType.YEAR;
        },
    },
    methods: {
        onDateSelect(date) {
            this.$emit('input', new Date(date.year, date.month - 1, date.day));
        },
        onMonthSelect(month) {
            const monthIndex = getMonthIndex(month) + 1;
            this.$emit('month', monthIndex);
            this.$emit('calendarType', CalendarType.DAY);
            this.$emit('calendarHeader', getHeaderForCalendarDaysType(monthIndex, this.year));
        },
        onYearSelect(year) {
            this.$emit('year', year);
            this.$emit('calendarType', CalendarType.MONTH);
            this.$emit('calendarHeader', year);
        },
    },
};
</script>
