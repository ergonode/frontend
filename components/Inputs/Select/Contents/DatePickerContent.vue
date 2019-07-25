/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="select-content">
        <DatePicker v-model="date" />
        <div
            class="horizontal-wrapper">
            <Button
                small
                title="OK"
                @click.native="onApplyClick" />
            <Button
                theme="dark"
                small
                title="Clear"
                color="transparent"
                @click.native="onClearClick" />
        </div>
    </div>
</template>

<script>
import DatePicker from '~/components/Inputs/Date/DatePicker';
import Button from '~/components/Buttons/Button';

export default {
    name: 'DatePickerContent',
    components: {
        DatePicker,
        Button,
    },
    props: {
        selectedDate: {
            type: Date,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            date: this.selectedDate,
        };
    },
    watch: {
        selectedDate() {
            this.date = this.selectedDate;
        },
    },
    methods: {
        onClearClick() {
            this.date = null;
            this.$emit('clear');
        },
        onApplyClick() {
            this.$emit('apply', this.date);
        },
    },
};
</script>

<style lang="scss" scoped>
    .select-content {
        position: fixed;
        z-index: 999;
        display: flex;
        flex-direction: column;
        background-color: $white;
        box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);
        min-width: 130px;

        .horizontal-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background-color: $background;
            box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.12);
        }
    }
</style>
