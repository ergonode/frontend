/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <th
        class="table-row-header"
        v-text="title" />
</template>

<script>
export default {
    name: 'TableRowHeader',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .table-row-header {
        padding: 12px;
        background-color: $WHITESMOKE;
        color: $GRAPHITE_DARK;
        font: $FONT_BOLD_12_16;
        text-align: left;

        &::first-letter {
            text-transform: uppercase;
        }
    }
</style>
