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
    name: 'IconListMedium',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M4,7 L20,7 L20,9 L4,9 L4,7 Z M4,10 L20,10 L20,12 L4,12 L4,10 Z M4,13 L20,13 L20,15 L4,15 L4,13 Z M4,16 L20,16 L20,18 L4,18 L4,16 Z';
        },
    },
};
</script>
