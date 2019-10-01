/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="filter-text-content">
        <GridAdvancedFilterShowOnly v-model="showOnlyEmptyRecords" />
        <Divider />
        <div
            v-if="!showOnlyEmptyRecords"
            class="container">
            <TextField
                :value="value"
                autofocus
                left-alignment
                small
                underline />
        </div>
    </div>
</template>

<script>
import TextField from '~/components/Inputs/TextField';
import GridAdvancedFilterShowOnly from '~/components/Grid/AdvancedFilters/GridAdvancedFilterShowOnly';
import Divider from '~/components/Dividers/Divider';

export default {
    name: 'GridAdvancedFilterTextContent',
    components: {
        TextField,
        GridAdvancedFilterShowOnly,
        Divider,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            showOnlyEmptyRecords: false,
        };
    },
};
</script>

<style lang="scss" scoped>
    .filter-text-content {
        display: flex;
        flex-direction: column;
    }

    .container {
        padding: 8px 12px;
    }
</style>
