/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands" />
    </Icon>
</template>

<script>

export default {
    name: 'IconUploadFile',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M19 18L19 20L5 20L5 18L19 18ZM9 11L5 11L12 4L19 11L15 11L15 16L9 16L9 11Z';
        },
    },
};
</script>
