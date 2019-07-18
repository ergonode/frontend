/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker">
        <slot name="header">
            <DatePickerHeader :header="header" />
        </slot>
        <DatePickerNavigationHeader
            :header="calendarHeader"
            @changeCalendarType="onChangeCalendarType"
            @previousDate="onPreviousDate"
            @nextDate="onNextDate" />
        <DatePickerCalendarContent
            :date="value"
            :month="month"
            :current-month="currentMonth"
            :year="year"
            :years="years"
            :current-year="currentYear"
            :calendar-type="selectedCalendarType"
            @input="onDateChange"
            @month="onMonthChange"
            @year="onYearChange"
            @calendarType="onCalendarTypeChange"
            @calendarHeader="onCalendarHeaderChange" />
    </div>
</template>

<script>
import DatePickerHeader from '~/components/Inputs/Date/DatePickerHeader';
import DatePickerNavigationHeader from '~/components/Inputs/Date/DatePickerNavigationHeader';
import DatePickerCalendarContent from '~/components/Inputs/Date/DatePickerCalendarContent';
import {
    getNextYear,
    getPreviousYear,
    getNextMonth,
    getPreviousMonth,
    getNextYearsRange,
    getPreviousYearsRange,
    getYearsWithinRange,
    getHeaderForCalendarDaysType,
    getHeaderForCalendarYearsType,
    zeroPad,
    CALENDAR_MONTHS,
} from '~/model/calendar/calendar';
import { CalendarType } from '~/model/calendar/CalendarType';

export default {
    name: 'DatePicker',
    components: {
        DatePickerHeader,
        DatePickerNavigationHeader,
        DatePickerCalendarContent,
    },
    props: {
        value: {
            type: Date,
            default: null,
        },
        calendarDate: {
            type: Date,
            default() {
                return new Date();
            },
        },
    },
    data() {
        const today = new Date();
        const year = this.calendarDate.getFullYear();
        const month = this.calendarDate.getMonth() + 1;

        return {
            years: getYearsWithinRange([], year),
            currentYear: today.getFullYear(),
            currentMonth: today.getMonth() + 1,
            month,
            year,
            selectedCalendarType: CalendarType.DAY,
            calendarHeader: getHeaderForCalendarDaysType(month, year),
        };
    },
    computed: {
        header() {
            if (!this.value) return 'Pick a date';

            const day = this.value.getDate();
            const month = this.value.getMonth();
            const year = this.value.getFullYear();

            switch (this.selectedCalendarType) {
            case CalendarType.DAY:
                return `${day}.${zeroPad(month, 2)}.${year}`;
            case CalendarType.MONTH: {
                const monthDesc = Object.values(CALENDAR_MONTHS)[month];
                return `${monthDesc} ${year}`;
            }
            case CalendarType.YEAR:
                return year;
            default:
                return '';
            }
        },
    },
    methods: {
        onDateChange(value) {
            this.$emit('input', value);
        },
        onMonthChange(month) {
            this.month = month;
        },
        onYearChange(year) {
            this.year = year;
        },
        onCalendarTypeChange(type) {
            this.selectedCalendarType = type;
        },
        onCalendarHeaderChange(header) {
            this.calendarHeader = header;
        },
        onPreviousDate() {
            switch (this.selectedCalendarType) {
            case CalendarType.DAY: {
                const { month, year } = getPreviousMonth(this.month, this.year);

                this.month = month;
                this.year = year;
                this.calendarHeader = getHeaderForCalendarDaysType(month, year);

                break;
            }
            case CalendarType.MONTH:
                this.year = getPreviousYear(this.year);
                this.calendarHeader = this.year;

                break;
            case CalendarType.YEAR:
                this.years = getPreviousYearsRange(this.years);
                this.calendarHeader = getHeaderForCalendarYearsType(this.years);

                break;
            default:
                break;
            }
        },
        onNextDate() {
            switch (this.selectedCalendarType) {
            case CalendarType.DAY: {
                const { month, year } = getNextMonth(this.month, this.year);

                this.month = month;
                this.year = year;
                this.calendarHeader = getHeaderForCalendarDaysType(month, year);

                break;
            }
            case CalendarType.MONTH: {
                this.year = getNextYear(this.year);
                this.calendarHeader = this.year;

                break;
            }
            case CalendarType.YEAR:
                this.years = getNextYearsRange(this.years);
                this.calendarHeader = getHeaderForCalendarYearsType(this.years);

                break;
            default:
                break;
            }
        },
        onChangeCalendarType() {
            switch (this.selectedCalendarType) {
            case CalendarType.DAY:
                this.selectedCalendarType = CalendarType.MONTH;
                this.calendarHeader = this.year;
                break;
            case CalendarType.MONTH:
                this.selectedCalendarType = CalendarType.YEAR;
                this.calendarHeader = getHeaderForCalendarYearsType(this.years);
                break;
            case CalendarType.YEAR:
                this.selectedCalendarType = CalendarType.DAY;
                this.calendarHeader = getHeaderForCalendarDaysType(this.month, this.year);
                break;
            default: break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker {
        width: 224px;
        padding: 16px;
    }
</style>
