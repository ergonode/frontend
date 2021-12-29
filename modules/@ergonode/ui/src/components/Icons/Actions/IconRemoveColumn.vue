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
    name: 'IconRemoveColumn',
    inheritAttrs: false,
    computed: {
        drawingCommands1() {
            return 'M14 0H24V24H14V20H16V22H22V2H16V4H14V0Z';
        },
        drawingCommands2() {
            return 'M14.2426 6.34323L15.6569 7.75744L11.4142 12.0001L15.6569 16.2427L14.2426 17.6569L10 13.4143L5.75736 17.6569L4.34315 16.2427L8.58579 12.0001L4.34315 7.75744L5.75736 6.34323L10 10.5859L14.2426 6.34323Z';
        },
    },
};
</script>
