/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtChild
        :key="$route.name"
        class="tab-content"
        keep-alive
        v-bind="$attrs"
        v-on="$listeners" />
</template>

<script>
export default {
    name: 'HorizontalTabBarContent',
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
    .tab-content {
        border-top: $BORDER_1_GREY;
    }
</style>
