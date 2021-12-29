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
    name: 'IconAdd',
    inheritAttrs: false,
    computed: {
        points() {
            return '11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13 19 11 13 11 13 5';
        },
    },
};
</script>
