/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template />

<script>
export default {
    name: 'GridTable',
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        cellValues: {
            type: Object,
            default: () => ({}),
        },
        rowIds: {
            type: Array,
            default: () => [],
        },
        rowLinks: {
            type: Array,
            default: () => [],
        },
        isDraggable: {
            type: Boolean,
            default: false,
        },
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
        isActionColumn: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>

</style>
