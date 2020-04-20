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
import Icon from '@Core/components/Icons/Icon';

export default {
    name: 'IconClearStyle',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5,5 L18,19 L17,20 L12,15 L10,19 L7,19 L10,13 L4,6 L5,5 Z M8,5 L20,5 L20,8 L15,8 L14,11 L12,9 L12,8 L10,8 L8,5 Z';
        },
    },
};
</script>
