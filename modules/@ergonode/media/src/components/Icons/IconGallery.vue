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
    name: 'IconGallery',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M8 2C6.89551 2 6 2.89545 6 4V16C6 17.1046 6.89551 18 8 18H20C21.1045 18 22 17.1046 22 16V4C22 2.89545 21.1045 2 20 2H8ZM16 11.5L13 14.5L11 12.5L8 16H20L16 11.5ZM11 9C12.1045 9 13 8.10455 13 7C13 5.89545 12.1045 5 11 5C9.89551 5 9 5.89545 9 7C9 8.10455 9.89551 9 11 9ZM2 20V6H4V20H18V22H4C2.8999 22 2 21.1 2 20Z';
        },
    },
};
</script>
