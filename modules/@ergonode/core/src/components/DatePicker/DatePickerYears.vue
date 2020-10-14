/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-years">
        <DatePickerContentHeader :headers="['Years']" />
        <div class="date-picker-years__nodes">
            <DatePickerNode
                v-for="node in nodes"
                :key="node"
                :selected="isSelectedYear(node)"
                :current="isCurrentDate(node)"
                :within-range="isWithinRange(node)"
                :title="node"
                @click.native="onClick(node)" />
        </div>
    </div>
</template>

<script>
import DatePickerContentHeader from '@Core/components/DatePicker/DatePickerContentHeader';
import DatePickerNode from '@Core/components/DatePicker/Node/DatePickerNode';

export default {
    name: 'DatePickerYears',
    components: {
        DatePickerContentHeader,
        DatePickerNode,
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
        nodes: {
            type: Array,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        },
        parsedYear() {
            if (this.value) {
                return this.value.getFullYear();
            }

            return null;
        },
        parsedRangeYear() {
            if (this.rangeValue) {
                return this.rangeValue.getFullYear();
            }

            return null;
        },
    },
    methods: {
        onClick(year) {
            this.$emit('select', year);
        },
        isSelectedYear(year) {
            return this.parsedYear === year || this.parsedRangeYear === year;
        },
        isCurrentDate(year) {
            return this.currentYear === year;
        },
        isWithinRange(year) {
            if (!(this.rangeValue && this.value)) {
                return false;
            }

            return this.parsedRangeYear >= year
                && this.parsedYear <= year;
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker-years {
        display: flex;
        flex-direction: column;

        &__nodes {
            display: grid;
            grid-template-columns: repeat(5, 45px);
            grid-auto-rows: 40px;
            align-items: center;
            justify-items: center;
        }
    }
</style>
