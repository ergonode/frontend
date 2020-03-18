/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="months">
        <DatePickerCalendarNode
            v-for="month in months"
            :key="month"
            :selected="isSelectedMonth(month)"
            :current="isCurrentMonth(month)"
            :title="month"
            @click.native="onClick(month)" />
    </div>
</template>

<script>
import DatePickerCalendarNode from '@Core/components/Inputs/DatePicker/DatePickerCalendarNode';

export default {
    name: 'DatePickerMonths',
    components: {
        DatePickerCalendarNode,
    },
    props: {
        months: {
            type: Array,
            required: true,
        },
        selectedMonth: {
            type: String,
            default: '',
        },
        currentMonth: {
            type: String,
            required: true,
        },
    },
    methods: {
        onClick(month) {
            this.$emit('monthSelected', month);
        },
        isSelectedMonth(month) {
            return this.selectedMonth === month;
        },
        isCurrentMonth(month) {
            return this.currentMonth === month;
        },
    },
};
</script>

<style lang="scss" scoped>
    .months {
        display: grid;
        grid-template-columns: repeat(3, 75px);
        grid-auto-rows: 40px;
        align-items: center;
        justify-items: center;
    }
</style>
