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
    name: 'IconRemoveFilter',
    inheritAttrs: false,
    computed: {
        drawingCommands1() {
            return 'M15 17H24V7H15V9H22V15H15V17Z';
        },
        drawingCommands2() {
            return 'M11.2426 6.34315L12.6568 7.75736L8.41421 12L12.6568 16.2426L11.2426 17.6569L6.99999 13.4142L2.75735 17.6569L1.34314 16.2426L5.58578 12L1.34314 7.75736L2.75735 6.34315L6.99999 10.5858L11.2426 6.34315Z';
        },
    },
};
</script>
