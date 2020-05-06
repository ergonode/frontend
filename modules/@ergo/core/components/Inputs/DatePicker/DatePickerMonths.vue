/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="months">
        <DatePickerNode
            v-for="month in months"
            :key="month"
            :selected="isSelectedMonth(month)"
            :current="isCurrentMonth(month)"
            :title="month"
            @click.native="onClick(month)" />
    </div>
</template>

<script>
import DatePickerNode from '@Core/components/Inputs/DatePicker/Node/DatePickerNode';

export default {
    name: 'DatePickerMonths',
    components: {
        DatePickerNode,
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
            this.$emit('select', month);
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
