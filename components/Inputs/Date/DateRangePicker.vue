/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-range-picker">
        <div class="date-range-picker__left">
            <DatePickerNavigationHeader
                :header="getDisplayingMonthAndYear(
                    lowerBoundMonth, lowerBoundYear
                )">
                <Button
                    slot="previous"
                    icon="arrow-dart trans-quarter"
                    fab
                    color="transparent"
                    ripple-color="rgba(235, 235, 236, 1)"
                    @click.native="previousMonth" />
                <div
                    slot="next"
                    class="expander" />
            </DatePickerNavigationHeader>
            <DatePickerContentHeader :headers="weekDays" />
            <DatePickerMonthDays
                :dates="lowerBoundCalendarDates"
                :selected-dates="parsedRange"
                @select="onSelectRange" />
        </div>
        <div class="date-range-picker__right">
            <DatePickerNavigationHeader
                :header="getDisplayingMonthAndYear(
                    upperBoundMonth, upperBoundYear
                )">
                <div
                    slot="previous"
                    class="expander" />
                <Button
                    slot="next"
                    icon="arrow-dart trans-three-fourth"
                    fab
                    color="transparent"
                    ripple-color="rgba(235, 235, 236, 1)"
                    @click.native="nextMonth" />
            </DatePickerNavigationHeader>
            <DatePickerContentHeader :headers="weekDays" />
            <DatePickerMonthDays
                :dates="upperBoundCalendarDates"
                :selected-dates="parsedRange"
                @select="onSelectRange" />
        </div>
    </div>
</template>

<script>

import Button from '~/components/Buttons/Button';
import DatePickerMonthDays from '~/components/Inputs/Date/DatePickerMonthDays';
import DatePickerContentHeader from '~/components/Inputs/Date/DatePickerContentHeader';
import DatePickerNavigationHeader from '~/components/Inputs/Date/DatePickerNavigationHeader';
import calendar, {
    getNextMonth,
    getPreviousMonth,
    WEEK_DAYS,
    CALENDAR_MONTHS,
} from '~/model/calendar/calendar';

export default {
    name: 'DateRangePicker',
    components: {
        Button,
        DatePickerMonthDays,
        DatePickerContentHeader,
        DatePickerNavigationHeader,
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
            lowerBoundMonth: month,
            lowerBoundYear: year,
            upperBoundMonth: month === 12 ? 1 : month + 1,
            upperBoundYear: month === 12 ? year + 1 : year,
        };
    },
    computed: {
        weekDays() {
            return Object.values(WEEK_DAYS);
        },
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
        getDisplayingMonthAndYear(month, year) {
            return `${this.getDisplayingMonth(month)} ${year}`;
        },
        getDisplayingMonth(month) {
            return Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];
        },
        previousMonth() {
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
        nextMonth() {
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
        onSelectRange(date) {
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
    },
};
</script>

<style lang="scss" scoped>
    .date-range-picker {
        display: flex;

        &__left {
            margin-right: 8px;
        }

        &__right {
            margin-left: 8px;
        }

        .expander {
            flex-basis: 32px;
        }
    }
</style>
