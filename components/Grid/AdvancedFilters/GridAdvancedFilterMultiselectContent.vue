/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <TranslationMultiselectListContent
            :options="options"
            :selected-options="value" />
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/GridAdvancedFilterBaseContent';
import TranslationMultiselectListContent from '~/components/Inputs/Select/Contents/TranslationMultiselectListContent';

export default {
    name: 'GridAdvancedFilterMultiselectContent',
    components: {
        GridAdvancedFilterBaseContent,
        TranslationMultiselectListContent,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
