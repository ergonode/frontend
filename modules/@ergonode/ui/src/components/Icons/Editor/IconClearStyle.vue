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
    name: 'IconClearStyle',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M20 7.99999V4.99999H6.39L9.39 7.99999H11.22L10.67 9.27999L12.76 11.38L14.21 7.99999H20ZM3.41 4.85999L2 6.26999L8.97 13.24L6.5 19H9.5L11.07 15.34L16.73 21L18.14 19.59L3.41 4.85999Z';
        },
    },
};
</script>
