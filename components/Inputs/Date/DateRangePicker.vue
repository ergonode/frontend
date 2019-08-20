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
                    fab
                    color="transparent"
                    @click.native="previousMonth">
                    <template v-slot:prepend>
                        <IconArrowSingle :state="leftArrow" />
                    </template>
                </Button>
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
                    fab
                    color="transparent"
                    @click.native="nextMonth">
                    <template v-slot:prepend>
                        <IconArrowSingle :state="rightArrow" />
                    </template>
                </Button>
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
import { Arrow } from '~/model/icons/Arrow';
import Button from '~/components/Buttons/Button';
import IconArrowSingle from '~/components/Icon/Arrows/IconArrowSingle';
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
        IconArrowSingle,
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
            leftArrow: Arrow.LEFT,
            rightArrow: Arrow.RIGHT,
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
            const {
                month: previousMonth, year: previousYear,
            } = getPreviousMonth(this.lowerBoundMonth, this.lowerBoundYear);

            this.lowerBoundMonth = previousMonth;
            this.lowerBoundYear = previousYear;
            this.upperBoundMonth = this.upperBoundMonth > 1
                ? this.upperBoundMonth - 1
                : 12;
            this.upperBoundYear = this.upperBoundMonth === 12
                ? this.upperBoundYear - 1
                : this.upperBoundYear;
        },
        nextMonth() {
            const {
                month: nextMonth, year: nextYear,
            } = getNextMonth(this.upperBoundMonth, this.upperBoundYear);

            this.upperBoundMonth = nextMonth;
            this.upperBoundYear = nextYear;
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
