/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands1" />
        <path :d="drawingCommands2" />
    </Icon>
</template>

<script>

export default {
    name: 'IconHeadingOne',
    inheritAttrs: false,
    computed: {
        drawingCommands1() {
            return 'M4 17.0001L6 17V13H11V17H13V7H11V11.0192H6V7H4V17.0001Z';
        },
        drawingCommands2() {
            return 'M20 7H18.0293L15 9.09091V11L18.0293 9V17.0001H20V7Z';
        },
    },
};
</script>
