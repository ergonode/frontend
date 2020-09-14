/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="nodesComponent.component"
        v-bind="nodesComponent.props"
        v-on="nodesComponent.listeners" />
</template>

<script>
import DatePickerContentHeader from '@Core/components/Inputs/DatePicker/DatePickerContentHeader';
import DatePickerMonth from '@Core/components/Inputs/DatePicker/DatePickerMonth';
import DatePickerMonths from '@Core/components/Inputs/DatePicker/DatePickerMonths';
import DatePickerYears from '@Core/components/Inputs/DatePicker/DatePickerYears';
import {
    getHeaderForCalendarDaysType,
    getMonthIndex,
} from '@Core/models/calendar/calendar';
import {
    CALENDAR_TYPE,
} from '@Core/models/calendar/CalendarType';

export default {
    name: 'DatePickerCalendar',
    components: {
        DatePickerMonth,
        DatePickerContentHeader,
        DatePickerMonths,
        DatePickerYears,
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
        year: {
            type: Number,
            required: true,
        },
        years: {
            type: Array,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        calendarType: {
            type: String,
            required: true,
        },
    },
    computed: {
        nodesComponent() {
            switch (this.calendarType) {
            case CALENDAR_TYPE.DAY:
                return {
                    component: DatePickerMonth,
                    props: {
                        value: this.value,
                        rangeValue: this.rangeValue,
                        month: this.month,
                        year: this.year,
                    },
                    listeners: {
                        select: this.onDaySelect,
                    },
                };
            case CALENDAR_TYPE.MONTH:
                return {
                    component: DatePickerMonths,
                    props: {
                        value: this.value,
                        rangeValue: this.rangeValue,
                        year: this.year,
                    },
                    listeners: {
                        select: this.onMonthSelect,
                    },
                };
            default: return {
                component: DatePickerYears,
                props: {
                    value: this.value,
                    rangeValue: this.rangeValue,
                    nodes: this.years,
                    year: this.year,
                },
                listeners: {
                    select: this.onYearSelect,
                },
            };
            }
        },
    },
    methods: {
        onDaySelect(date) {
            this.$emit('input', new Date(date.year, date.month - 1, date.day));
        },
        onMonthSelect(month) {
            const monthIndex = getMonthIndex(month) + 1;
            this.$emit('month', monthIndex);
            this.$emit('calendarType', CALENDAR_TYPE.DAY);
            this.$emit('calendarHeader', getHeaderForCalendarDaysType(monthIndex, this.year));
        },
        onYearSelect(year) {
            this.$emit('year', year);
            this.$emit('calendarType', CALENDAR_TYPE.MONTH);
            this.$emit('calendarHeader', year);
        },
    },
};
</script>
