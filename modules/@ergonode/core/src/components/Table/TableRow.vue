/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <tr class="table-row">
        <TableCell
            v-if="title"
            :header="true"
            :value="title" />
        <TableCell
            v-for="(value, index) in values"
            :key="index"
            :header="header"
            :value="value" />
    </tr>
</template>

<script>
import TableCell from '@Core/components/Table/TableCell';

export default {
    name: 'TableRow',
    components: {
        TableCell,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        values: {
            type: Array,
            default: () => [],
        },
        header: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .table-row {
        border: 1px solid $GREY;
    }
</style>
