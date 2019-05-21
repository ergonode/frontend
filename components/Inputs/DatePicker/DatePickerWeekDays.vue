/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="week">
        <div
            v-for="day in days"
            :key="day"
            class="week__day">
            <span
                class="typo-subtitle txt--dark-graphite"
                v-text="day" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'DatePickerWeekDays',
    props: {
        days: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .week {
        display: grid;
        grid-template-columns: repeat(7, 32px);
        justify-items: center;
        align-items: center;
    }
</style>
