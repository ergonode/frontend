/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-range-picker">
        <div class="date-picker">
            <DatePickerNavigationHeader
                :header="getDisplayingMonthAndYear(
                    lowerBoundMonth, lowerBoundYear
                )"
                @previousDate="onPreviousDate"
                @nextDate="onNextDate" />
            <!--            <DatePickerContentHeader :headers="weekDays" />-->
            <!--            <DatePickerMonthDays-->
            <!--                :dates="lowerBoundCalendarDates"-->
            <!--                :selected-dates="parsedRange"-->
            <!--                @select="onSelectRange" />-->
            <DatePickerCalendarContent
                :date="value.from"
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
        <div class="vertical-divider" />
        <div class="date-picker">
            <DatePickerNavigationHeader
                :header="getDisplayingMonthAndYear(
                    upperBoundMonth, upperBoundYear
                )"
                @previousDate="onPreviousDate"
                @nextDate="onNextDate" />
            <!--            <DatePickerContentHeader :headers="weekDays" />-->
            <!--            <DatePickerMonthDays-->
            <!--                :dates="upperBoundCalendarDates"-->
            <!--                :selected-dates="parsedRange"-->
            <!--                @select="onSelectRange" />-->
            <DatePickerCalendarContent
                :date="value.to"
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
    </div>
</template>

<script>
import DatePickerCalendarContent from '~/components/Inputs/Date/DatePickerCalendarContent';
import DatePickerNavigationHeader from '~/components/Inputs/Date/DatePickerNavigationHeader';
import calendar, {
    getNextMonth,
    getPreviousMonth,
    getYearsWithinRange,
    getHeaderForCalendarDaysType,
    getHeaderForCalendarYearsType,
} from '~/model/calendar/calendar';
import { CalendarType } from '~/model/calendar/CalendarType';

export default {
    name: 'DateRangePicker',
    components: {
        DatePickerNavigationHeader,
        DatePickerCalendarContent,
    },
    props: {
        value: {
            type: Object,
            required: false,
            default: () => ({ from: null, to: null }),
        },
    },
    data() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        return {
            years: getYearsWithinRange([], year),
            currentYear: year,
            currentMonth: month,
            month,
            year,
            selectedCalendarType: CalendarType.DAY,
            calendarHeader: getHeaderForCalendarDaysType(month, year),
            // lowerBoundMonth: month,
            // lowerBoundYear: year,
            // upperBoundMonth: month === 12 ? 1 : month + 1,
            // upperBoundYear: month === 12 ? year + 1 : year,
        };
    },
    computed: {
        lowerBoundCalendarDates() {
            return calendar(this.lowerBoundMonth, this.lowerBoundYear);
        },
        upperBoundCalendarDates() {
            return calendar(this.upperBoundMonth, this.upperBoundYear);
        },
        parsedRange() {
            return Object.keys(this.value).reduce((previous, current) => {
                if (this.value[current]) {
                    previous.push(new Date(this.value[current]));
                }

                return previous;
            }, []);
        },
    },
    methods: {
        onDateChange(date) {
            const to = this.value.to
                ? new Date(this.value.to)
                : null;

            const from = this.value.from
                ? new Date(this.value.from)
                : null;

            const dateToInsert = new Date(date.year, date.month - 1, date.day);

            if (from) {
                if (+from > +dateToInsert) {
                    this.$emit('input', { from: dateToInsert, to });
                    return;
                }
            } else {
                this.$emit('input', { from: dateToInsert, to });
                return;
            }

            this.$emit('input', { from, to: dateToInsert });
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
            const { month, year } = getPreviousMonth(this.lowerBoundMonth, this.lowerBoundYear);

            this.lowerBoundMonth = month;
            this.lowerBoundYear = year;
            this.upperBoundMonth = this.upperBoundMonth > 1
                ? this.upperBoundMonth - 1
                : 12;
            this.upperBoundYear = this.upperBoundMonth === 12
                ? this.upperBoundYear - 1
                : this.upperBoundYear;
        },
        onNextDate() {
            const { month, year } = getNextMonth(this.upperBoundMonth, this.upperBoundYear);

            this.upperBoundMonth = month;
            this.upperBoundYear = year;
            this.lowerBoundMonth = this.lowerBoundMonth < 12
                ? this.lowerBoundMonth + 1
                : 1;
            this.lowerBoundYear = this.lowerBoundMonth === 1
                ? this.lowerBoundYear + 1
                : this.lowerBoundYear;
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
    .date-range-picker {
        display: grid;
        grid-template-columns: 256px 1px 256px;
        grid-auto-flow: column;

        .date-picker {
            padding: 16px;
        }

        .vertical-divider {
            height: 100%;
            background-color: $lightGrey;
        }
    }
</style>
