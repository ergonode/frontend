/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="month">
        <div
            v-for="date in dates"
            :key="`${date.year}|${date.month}|${date.day}`"
            :class="dayStateClasses(date.disabled, isSelectedDate(date, date.disabled))"
            @click="() => onSelectDate(date)">
            <span
                class="day-title typo-btn--xs"
                v-text="date.day" />
        </div>
    </div>
</template>

<script>
import {
    isSameDay,
} from '~/model/calendar/calendar';

export default {
    name: 'DatePickerMonthDays',
    props: {
        dates: {
            type: Array,
            required: true,
        },
        selectedDates: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    methods: {
        dayStateClasses(disabled, selected) {
            return [
                'month__day',
                {
                    'month__day--selected': selected,
                    'month__day--disabled': disabled,
                },
            ];
        },
        onSelectDate(date) {
            this.$emit('select', { ...date });
        },
        isSelectedDate(date, disabled) {
            const { length } = this.selectedDates;
            const parsedDate = new Date(date.year, date.month - 1, date.day);

            if (!length || disabled) return null;
            const { 0: firstDate } = this.selectedDates;

            if (length === 1) {
                return isSameDay(parsedDate, firstDate);
            }

            const { [length - 1]: lastDate } = this.selectedDates;

            return +parsedDate >= firstDate && +parsedDate <= lastDate;
        },
    },
};
</script>

<style lang="scss" scoped>
    .month {
        display: grid;
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(6, 32px);
        justify-items: center;
        align-items: center;

        &__day {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            cursor: pointer;

            &:not(&--selected) &:not(&--disabled) {
                .day-title {
                    color: $darkGraphite;
                }
            }

            &--selected {
                background-color: $success;

                .day-title {
                    color: $white;
                }
            }

            &--disabled {
                .day-title {
                    color: $lightGraphite;
                }
            }
        }
    }
</style>
