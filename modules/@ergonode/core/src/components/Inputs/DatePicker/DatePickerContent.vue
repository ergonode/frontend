/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker">
        <DatePickerHeader :header="header" />
        <DatePickerNavigationHeader
            :header="calendarHeader"
            @changeCalendarType="onChangeCalendarType"
            @previousDate="onPreviousDate"
            @nextDate="onNextDate" />
        <DatePickerCalendar
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
import DatePickerCalendar from '@Core/components/Inputs/DatePicker/Calendar/DatePickerCalendar';
import DatePickerHeader from '@Core/components/Inputs/DatePicker/DatePickerHeader';
import DatePickerNavigationHeader from '@Core/components/Inputs/DatePicker/DatePickerNavigationHeader';
import {
    CALENDAR_MONTHS,
    getHeaderForCalendarDaysType,
    getHeaderForCalendarYearsType,
    getNextMonth,
    getNextYear,
    getNextYearsRange,
    getPreviousMonth,
    getPreviousYear,
    getPreviousYearsRange,
    getYearsWithinRange,
    zeroPad,
} from '@Core/models/calendar/calendar';
import {
    CALENDAR_TYPE,
} from '@Core/models/calendar/CalendarType';

export default {
    name: 'DatePickerContent',
    components: {
        DatePickerHeader,
        DatePickerNavigationHeader,
        DatePickerCalendar,
    },
    props: {
        value: {
            type: Date,
            default: null,
        },
    },
    data() {
        const today = this.value || new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        return {
            years: getYearsWithinRange([], year),
            currentYear: today.getFullYear(),
            currentMonth: today.getMonth() + 1,
            month,
            year,
            selectedCalendarType: CALENDAR_TYPE.DAY,
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
            case CALENDAR_TYPE.DAY:
                return `${day}.${zeroPad(month, 2)}.${year}`;
            case CALENDAR_TYPE.MONTH: {
                const monthDesc = Object.values(CALENDAR_MONTHS)[month];
                return `${monthDesc} ${year}`;
            }
            case CALENDAR_TYPE.YEAR:
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
            case CALENDAR_TYPE.DAY: {
                const {
                    month: previousMonth, year: previousYear,
                } = getPreviousMonth(this.month, this.year);

                this.month = previousMonth;
                this.year = previousYear;
                this.calendarHeader = getHeaderForCalendarDaysType(previousMonth, previousYear);

                break;
            }
            case CALENDAR_TYPE.MONTH:
                this.year = getPreviousYear(this.year);
                this.calendarHeader = this.year;

                break;
            case CALENDAR_TYPE.YEAR:
                this.years = getPreviousYearsRange(this.years);
                this.calendarHeader = getHeaderForCalendarYearsType(this.years);

                break;
            default:
                break;
            }
        },
        onNextDate() {
            switch (this.selectedCalendarType) {
            case CALENDAR_TYPE.DAY: {
                const {
                    month: nextMonth, year: nextYear,
                } = getNextMonth(this.month, this.year);

                this.month = nextMonth;
                this.year = nextYear;
                this.calendarHeader = getHeaderForCalendarDaysType(nextMonth, nextYear);

                break;
            }
            case CALENDAR_TYPE.MONTH: {
                this.year = getNextYear(this.year);
                this.calendarHeader = this.year;

                break;
            }
            case CALENDAR_TYPE.YEAR:
                this.years = getNextYearsRange(this.years);
                this.calendarHeader = getHeaderForCalendarYearsType(this.years);

                break;
            default:
                break;
            }
        },
        onChangeCalendarType() {
            switch (this.selectedCalendarType) {
            case CALENDAR_TYPE.DAY:
                this.selectedCalendarType = CALENDAR_TYPE.MONTH;
                this.calendarHeader = this.year;
                break;
            case CALENDAR_TYPE.MONTH:
                this.selectedCalendarType = CALENDAR_TYPE.YEAR;
                this.calendarHeader = getHeaderForCalendarYearsType(this.years);
                break;
            case CALENDAR_TYPE.YEAR:
                this.selectedCalendarType = CALENDAR_TYPE.DAY;
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
