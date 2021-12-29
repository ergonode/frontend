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
    name: 'IconTranslate',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M12.6327 14.5055L10.7855 12.68L10.8073 12.6582C12.0727 11.2473 12.9745 9.62545 13.5055 7.90909H15.6364V6.45455H10.5455V5H9.09091V6.45455H4V7.90182H12.1236C11.6364 9.30545 10.8655 10.6364 9.81818 11.8C9.14182 11.0509 8.58182 10.2291 8.13818 9.36364H6.68364C7.21455 10.5491 7.94182 11.6691 8.85091 12.68L5.14909 16.3309L6.18182 17.3636L9.81818 13.7273L12.08 15.9891L12.6327 14.5055ZM16.7273 10.8182H15.2727L12 19.5455H13.4545L14.2691 17.3636H17.7236L18.5455 19.5455H20L16.7273 10.8182ZM16 12.76L14.8218 15.9091H17.1782L16 12.76Z';
        },
    },
};
</script>
