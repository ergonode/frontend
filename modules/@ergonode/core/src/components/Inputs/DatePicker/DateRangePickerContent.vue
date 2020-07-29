/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-range-picker-content">
        <DatePickerContent
            :value="value.from"
            :range-value="value.to"
            @input="onSelectRange">
            <template #header>
                <DatePickerHeader :header="fromHeader" />
            </template>
        </DatePickerContent>
        <Divider vertical />
        <DatePickerContent
            :value="value.from"
            :range-value="value.to"
            @input="onSelectRange">
            <template #header>
                <DatePickerHeader :header="toHeader" />
            </template>
        </DatePickerContent>
    </div>
</template>

<script>
import Divider from '@Core/components/Dividers/Divider';
import DatePickerContent from '@Core/components/Inputs/DatePicker/DatePickerContent';
import DatePickerHeader from '@Core/components/Inputs/DatePicker/DatePickerHeader';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    DEFAULT_FORMAT,
    WEEK_DAYS,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'DateRangePickerContent',
    components: {
        DatePickerContent,
        Divider,
        DatePickerHeader,
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
        onSelectRange(date) {
            const {
                from, to,
            } = this.value;

            if (from && to || (from && date < from)) {
                this.$emit('input', {
                    from: date,
                    to: null,
                });
            } else if (from === null) {
                this.$emit('input', {
                    from: date,
                    to,
                });
            } else {
                this.$emit('input', {
                    from,
                    to: date,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-range-picker-content {
        display: flex;
    }
</style>
