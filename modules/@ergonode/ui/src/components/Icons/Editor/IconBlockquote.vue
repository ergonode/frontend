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
    name: 'IconBlockquote',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5 17H8L10 13V7H4V13H7L5 17ZM15 17H18L20 13V7H14V13H17L15 17Z';
        },
    },
};
</script>
