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
    name: 'IconBell',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M12,21.5 C13.1,21.5 14,20.6 14,19.5 L10,19.5 C10,20.6 10.89,21.5 12,21.5 L12,21.5 Z M18,15.5 L18,10.5 C18,7.43 16.36,4.86 13.5,4.18 L13.5,3.5 C13.5,2.67 12.83,2 12,2 C11.17,2 10.5,2.67 10.5,3.5 L10.5,4.18 C7.63,4.86 6,7.42 6,10.5 L6,15.5 L4,17.5 L4,18.5 L20,18.5 L20,17.5 L18,15.5 L18,15.5 Z';
        },
    },
};
</script>
