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
    name: 'IconExport',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M20,8.92307692 L15.4285714,8.92307692 L15.4285714,2 L8.57142857,2 L8.57142857,8.92307692 L4,8.92307692 L12,17 L20,8.92307692 Z M4,20 L4,22 L20,22 L20,20 L4,20 Z';
        },
    },
};
</script>
