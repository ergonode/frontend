/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-range-picker">
        <div class="date-range-picker__left">
            <DatePickerInputHeader
                v-if="inputHeader"
                header="From"
                :value="headerFromValue"
                @input="onFromHeaderValueChange" />
            <DatePickerHeader
                v-else
                :header="fromHeader" />
            <DatePickerNavigationHeader
                :header="getDisplayingMonthAndYear(
                    lowerBoundMonth, lowerBoundYear
                )">
                <template #previous>
                    <Fab
                        :theme="secondaryTheme"
                        @click.native="previousMonth">
                        <template #icon="{ color }">
                            <IconArrowSingle
                                :fill-color="color"
                                :state="leftArrow" />
                        </template>
                    </Fab>
                </template>
                <template #next>
                    <div class="expander" />
                </template>
            </DatePickerNavigationHeader>
            <DatePickerContentHeader :headers="weekDays" />
            <DatePickerDays
                :dates="lowerBoundCalendarDates"
                :selected-dates="parsedRange"
                @select="onSelectRange" />
        </div>
        <Divider vertical />
        <div class="date-range-picker__right">
            <DatePickerInputHeader
                v-if="inputHeader"
                header="To"
                :value="headerToValue"
                @input="onToHeaderValueChange" />
            <DatePickerHeader
                v-else
                :header="toHeader" />
            <DatePickerNavigationHeader
                :header="getDisplayingMonthAndYear(
                    upperBoundMonth, upperBoundYear
                )">
                <template #previous>
                    <div class="expander" />
                </template>
                <template #next>
                    <Fab
                        :theme="secondaryTheme"
                        @click.native="nextMonth">
                        <template #icon="{ color }">
                            <IconArrowSingle
                                :fill-color="color"
                                :state="rightArrow" />
                        </template>
                    </Fab>
                </template>
            </DatePickerNavigationHeader>
            <DatePickerContentHeader :headers="weekDays" />
            <DatePickerDays
                :dates="upperBoundCalendarDates"
                :selected-dates="parsedRange"
                @select="onSelectRange" />
        </div>
    </div>
</template>

<script>
import Fab from '@Core/components/Buttons/Fab';
import Divider from '@Core/components/Dividers/Divider';
import IconArrowSingle from '@Core/components/Icons/Arrows/IconArrowSingle';
import DatePickerContentHeader from '@Core/components/Inputs/DatePicker/DatePickerContentHeader';
import DatePickerDays from '@Core/components/Inputs/DatePicker/DatePickerDays';
import DatePickerHeader from '@Core/components/Inputs/DatePicker/DatePickerHeader';
import DatePickerInputHeader from '@Core/components/Inputs/DatePicker/DatePickerInputHeader';
import DatePickerNavigationHeader from '@Core/components/Inputs/DatePicker/DatePickerNavigationHeader';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    THEME,
} from '@Core/defaults/theme';
import calendar, {
    CALENDAR_MONTHS,
    DEFAULT_FORMAT,
    getNextMonth,
    getPreviousMonth,
    WEEK_DAYS,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'DateRangePickerContent',
    components: {
        Fab,
        DatePickerDays,
        DatePickerContentHeader,
        DatePickerNavigationHeader,
        IconArrowSingle,
        Divider,
        DatePickerHeader,
        DatePickerInputHeader,
    },
    props: {
        value: {
            type: Object,
            required: false,
            default: () => ({
                from: null,
                to: null,
            }),
        },
        inputHeader: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: DEFAULT_FORMAT,
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
            leftArrow: ARROW.LEFT,
            rightArrow: ARROW.RIGHT,
            headerFromValue: '',
            headerToValue: '',
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
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
        fromHeader() {
            if (this.value.from) {
                return `From ${formatDate(this.value.from, this.format)}`;
            }

            return 'From';
        },
        toHeader() {
            if (this.value.to) {
                return `To ${formatDate(this.value.to, this.format)}`;
            }

            return 'To';
        },
    },
    methods: {
        onFromHeaderValueChange(value) {
            this.headerFromValue = value;
        },
        onToHeaderValueChange(value) {
            this.headerToValue = value;
        },
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
                    this.$emit('input', {
                        from: dateToInsert,
                        to,
                    });
                    return;
                }
            } else {
                this.$emit('input', {
                    from: dateToInsert,
                    to,
                });
                return;
            }

            this.$emit('input', {
                from,
                to: dateToInsert,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-range-picker {
        display: grid;
        grid-auto-flow: column;

        &__left, &__right {
            padding: 16px;
        }

        .interactive-header {
            margin-bottom: 8px;
        }
    }

    .expander {
        flex-basis: 32px;
    }
</style>
