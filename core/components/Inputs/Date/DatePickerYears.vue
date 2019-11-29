/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="years">
        <DatePickerCalendarNode
            v-for="year in years"
            :key="year"
            :selected="isSelectedYear(year)"
            :current="isCurrentYear(year)"
            :title="year"
            @click.native="() => onClick(year)" />
    </div>
</template>

<script>
import DatePickerCalendarNode from '~/core/components/Inputs/Date/DatePickerCalendarNode';

export default {
    name: 'DatePickerYears',
    components: {
        DatePickerCalendarNode,
    },
    props: {
        years: {
            type: Array,
            required: true,
        },
        selectedYear: {
            type: Number,
            default: null,
        },
        currentYear: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onClick(year) {
            this.$emit('yearSelected', year);
        },
        isSelectedYear(year) {
            return this.selectedYear === year;
        },
        isCurrentYear(year) {
            return this.currentYear === year;
        },
    },
};
</script>

<style lang="scss" scoped>
    .years {
        display: grid;
        grid-template-columns: repeat(5, 45px);
        grid-auto-rows: 40px;
        align-items: center;
        justify-items: center;
    }
</style>
