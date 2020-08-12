/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="table-row-info-cell"
        v-text="title" />
</template>

<script>
export default {
    name: 'TableRowInfoCell',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .table-row-info-cell {
        font: $FONT_MEDIUM_12_16;
        color: $GRAPHITE_DARK;
        text-align: left;
    }
</style>
