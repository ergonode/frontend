/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <DateRangePickerContent :input-header="true" />
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import DateRangePickerContent from '~/components/Inputs/Date/DateRangePickerContent';

export default {
    name: 'GridAdvancedFilterDateContent',
    components: {
        GridAdvancedFilterBaseContent,
        DateRangePickerContent,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
    },
};
</script>
