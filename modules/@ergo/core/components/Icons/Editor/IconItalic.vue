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
    name: 'IconItalic',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M9.96062 5V8H12.1538L8.75759 16H6V19H13.9212V16H11.728L15.1242 8H17.8818V5H9.96062Z';
        },
    },
};
</script>
