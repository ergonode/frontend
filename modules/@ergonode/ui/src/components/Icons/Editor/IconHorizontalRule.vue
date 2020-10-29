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
    name: 'IconHorizontalRule',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M11 6H8L12 2L16 6H13V9H11L11 6ZM4 11V13H20V11H4ZM16 18H13V15H11V18H8L12 22L16 18Z';
        },
    },
};
</script>
