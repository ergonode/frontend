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
import Icon from '@UI/components/Icons/Icon';

export default {
    name: 'IconRelation',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M10.425 8.85L4.575 3L3 4.575L8.85 10.425L10.425 8.85ZM14.8125 3L17.0625 5.25L3 19.425L4.575 21L18.75 6.9375L21 9.1875V3H14.8125ZM13.575 15.15L15.15 13.575L18.75 16.95L21 14.7V20.8875H14.8125L17.0625 18.6375L13.575 15.15Z';
        },
    },
};
</script>
