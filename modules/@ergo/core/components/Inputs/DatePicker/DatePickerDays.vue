/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="month">
        <DatePickerNode
            v-for="date in dates"
            :key="`${date.year}|${date.month}|${date.day}`"
            :selected="isSelectedDate(date)"
            :disabled="date.disabled"
            :current="isToday(date)"
            :title="date.day"
            @click.native="onSelectDate(date)" />
    </div>
</template>

<script>
import DatePickerNode from '@Core/components/Inputs/DatePicker/Node/DatePickerNode';
import {
    isSameDay,
} from '@Core/models/calendar/calendar';

export default {
    name: 'DatePickerDays',
    components: {
        DatePickerNode,
    },
    props: {
        dates: {
            type: Array,
            required: true,
        },
        selectedDates: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentDate: new Date(),
        };
    },
    methods: {
        onSelectDate(date) {
            this.$emit('select', {
                ...date,
            });
        },
        isSelectedDate(date) {
            const {
                length,
            } = this.selectedDates;
            const parsedDate = new Date(date.year, date.month - 1, date.day);

            if (!length || date.disabled) return null;
            const {
                0: firstDate,
            } = this.selectedDates;

            if (length === 1) {
                return isSameDay(parsedDate, firstDate);
            }

            const {
                [length - 1]: lastDate,
            } = this.selectedDates;

            return +parsedDate >= firstDate && +parsedDate <= lastDate;
        },
        isToday(date) {
            const parsedDate = new Date(date.year, date.month - 1, date.day);

            return isSameDay(parsedDate, this.currentDate);
        },
    },
};
</script>

<style lang="scss" scoped>
    .month {
        display: grid;
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(5, 32px);
        justify-items: center;
        align-items: center;
    }
</style>
