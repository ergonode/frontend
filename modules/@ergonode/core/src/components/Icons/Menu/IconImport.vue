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
    name: 'IconImport',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M20,10.0769231 L15.4285714,10.0769231 L15.4285714,17 L8.57142857,17 L8.57142857,10.0769231 L4,10.0769231 L12,2 L20,10.0769231 Z M4,20 L4,22 L20,22 L20,20 L4,20 Z';
        },
    },
};
</script>
