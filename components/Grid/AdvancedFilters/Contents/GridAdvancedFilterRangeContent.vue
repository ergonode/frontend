/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <div class="container">
            <TextField
                :value="value.from"
                underline
                center-alignment
                small />
            <span class="dash">-</span>
            <TextField
                :value="value.to"
                underline
                center-alignment
                small />
        </div>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import TextField from '~/components/Inputs/TextField';
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';

export default {
    name: 'GridAdvancedFilterRangeContent',
    components: {
        TextField,
        GridAdvancedFilterBaseContent,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .container {
        display: grid;
        grid-template-columns: 80px 24px 80px;
        align-items: center;
        padding: 8px 12px;
    }

    .dash {
        @include setFont(medium, small, regular, $darkGraphite);

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
