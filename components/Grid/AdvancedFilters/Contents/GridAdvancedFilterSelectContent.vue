/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <TranslationSelectListContent
            :options="options"
            :selected-options="value"
            @value="onValueChange" />
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import TranslationSelectListContent from '~/components/Inputs/Select/Contents/TranslationSelectListContent';

export default {
    name: 'GridAdvancedFilterSelectContent',
    components: {
        GridAdvancedFilterBaseContent,
        TranslationSelectListContent,
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
    methods: {
        onValueChange(value) {
            this.$emit('input', value.key);
        },
    },
};
</script>
