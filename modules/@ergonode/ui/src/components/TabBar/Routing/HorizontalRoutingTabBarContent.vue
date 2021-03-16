/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtChild
        :key="$route.name"
        keep-alive
        v-bind="$attrs"
        v-on="$listeners" />
</template>

<script>
export default {
    name: 'HorizontalRoutingTabBarContent',
    inheritAttrs: false,
};
</script>
