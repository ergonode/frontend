/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
    name: 'IconEmail',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M4.8 5H19.2C20.19 5 21 5.81 21 6.8V17.6C21 18.59 20.19 19.4 19.2 19.4H4.8C3.81 19.4 3 18.59 3 17.6V6.8C3 5.81 3.81 5 4.8 5ZM12 13.1L19.2 8.6V6.8L12 11.3L4.8 6.8V8.6L12 13.1Z';
        },
    },
};
</script>
