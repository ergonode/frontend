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
    name: 'IconClose',
    inheritAttrs: false,
    computed: {
        points() {
            return '18 7.20857143 16.7914286 6 12 10.7914286 7.20857143 6 6 7.20857143 10.7914286 12 6 16.7914286 7.20857143 18 12 13.2085714 16.7914286 18 18 16.7914286 13.2085714 12';
        },
    },
};
</script>
