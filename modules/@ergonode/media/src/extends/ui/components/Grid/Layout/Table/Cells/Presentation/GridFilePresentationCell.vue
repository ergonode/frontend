/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-file-presentation-cell">
        <IconFile />
    </div>
</template>

<script>

export default {
    name: 'GridFilePresentationCell',
    props: {
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-file-presentation-cell {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
</style>
