/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent>
        <div class="container">
            <TextField
                :value="value"
                autofocus
                left-alignment
                small
                underline />
        </div>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import TextField from '~/components/Inputs/TextField';
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';

export default {
    name: 'GridAdvancedFilterTextContent',
    components: {
        TextField,
        GridAdvancedFilterBaseContent,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .container {
        padding: 8px 12px;
    }
</style>
