/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-header">
        <slot name="previous" />
        <span
            class="typo-list txt--dark-graphite"
            v-text="header" />
        <slot name="next" />
    </div>
</template>

<script>
export default {
    name: 'DatePickerNavigationHeader',
    props: {
        header: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 224px;
    }
</style>
