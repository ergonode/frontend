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
    name: 'IconFilters',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M9,20 L15,20 L15,17 L9,17 L9,20 Z M2,5 L2,8 L22,8 L22,5 L2,5 Z M5,14 L19,14 L19,11 L5,11 L5,14 Z';
        },
    },
};
</script>
