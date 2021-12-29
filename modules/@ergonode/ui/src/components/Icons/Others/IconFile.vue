/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="drawingCommands" />
    </Icon>
</template>

<script>

export default {
    name: 'IconFile',
    computed: {
        drawingCommands() {
            return 'M6 2H14L20 8V20C20 21.1 19.1 22 18 22H5.99C4.89 22 4 21.1 4 20L4.01 4C4.01 2.9 4.9 2 6 2ZM8 18H16V16H8V18ZM16 14H8V12H16V14ZM13 3.5V9H18.5L13 3.5Z';
        },
    },
};
</script>
