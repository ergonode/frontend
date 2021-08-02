/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <polygon :points="points" />
    </Icon>
</template>

<script>

export default {
    name: 'IconDashboard',
    inheritAttrs: false,
    computed: {
        points() {
            return '10 21 10 15 14 15 14 21 19 21 19 13 22 13 12 4 2 13 5 13 5 21';
        },
    },
};
</script>
