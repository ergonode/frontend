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
    name: 'IconFile',
    components: {
        Icon,
    },
    computed: {
        drawingCommands() {
            return 'M4.01 2L4 22H20V8L14 2H4.01ZM13 9V3.5L18.5 9H13Z';
        },
    },
};
</script>
