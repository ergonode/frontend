/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-content">
        <slot name="header">
            <DatePickerHeader :title="title" />
        </slot>
        <DatePickerNavigationHeader
            :title="calendarHeader"
            @change-calendar-type="onChangeCalendarType"
            @previous-date="onPreviousDate"
            @next-date="onNextDate" />
        <DatePickerCalendar
            :value="value"
            :range-value="rangeValue"
            :month="month"
            :year="year"
            :years="years"
            :calendar-type="selectedCalendarType"
            :disabled-past="disabledPast"
            @input="onDateChange"
            @month="onMonthChange"
            @year="onYearChange"
            @calendar-type="onCalendarTypeChange"
            @calendar-header="onCalendarHeaderChange" />
    </div>
</template>

<script>
import DatePickerCalendar from '@UI/components/DatePicker/Calendar/DatePickerCalendar';
import DatePickerHeader from '@UI/components/DatePicker/DatePickerHeader';
import DatePickerNavigationHeader from '@UI/components/DatePicker/DatePickerNavigationHeader';
import {
    CALENDAR_TYPE,
    DEFAULT_FORMAT,
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
} from '@UI/models/calendar';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'DatePickerContent',
    components: {
        DatePickerHeader,
        DatePickerNavigationHeader,
        DatePickerCalendar,
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
         * Determines whether to exclude past dates
         */
        disabledPast: {
            type: Boolean,
            default: false,
        },
        /**
         * Date format used for parsing value
         */
        format: {
            type: String,
            default: DEFAULT_FORMAT,
        },
    },
    data() {
        const now = new Date();
        const today = this.value || now;
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        return {
            years: getYearsWithinRange([], year),
            month,
            year,
            selectedCalendarType: CALENDAR_TYPE.DAY,
            calendarHeader: getHeaderForCalendarDaysType(month, year),
        };
    },
    computed: {
        title() {
            if (!this.value) return 'Pick a date';

            const month = this.value.getMonth() + 1;
            const year = this.value.getFullYear();

            switch (this.selectedCalendarType) {
            case CALENDAR_TYPE.DAY:
                return formatDate(this.value, this.format);
            case CALENDAR_TYPE.MONTH: {
                return getHeaderForCalendarDaysType(month, year);
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
    .date-picker-content {
        width: 224px;
        padding: 16px;
    }
</style>
