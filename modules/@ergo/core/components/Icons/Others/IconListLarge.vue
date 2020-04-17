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
    name: 'IconListLarge',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M4,7 L20,7 L20,10 L4,10 L4,7 Z M4,11 L20,11 L20,14 L4,14 L4,11 Z M4,15 L20,15 L20,18 L4,18 L4,15 Z';
        },
    },
};
</script>
