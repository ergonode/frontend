/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <DatePicker v-model="date" />
        <DateRangePicker v-model="rangeDate" />
    </PageWrapper>
</template>

<script>

import PageWrapper from '~/components/Layout/PageWrapper';
import DatePicker from '~/components/Inputs/Date/DatePicker';
import DateRangePicker from '~/components/Inputs/Date/DateRangePicker';

export default {
    name: 'Settings',
    components: {
        PageWrapper,
        DatePicker,
        DateRangePicker,
    },
    data() {
        return {
            date: null,
            rangeDate: {
                from: null,
                to: null,
            },
        };
    },
};
</script>
