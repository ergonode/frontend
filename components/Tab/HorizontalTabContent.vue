/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtChild
        :key="$route.name"
        class="tab-content"
        keep-alive
        v-bind="item.props" />
</template>

<script>
export default {
    name: 'HorizontalTabContent',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-content {
        display: flex;
        flex: 1;
        background-color: $white;
        border-top: 1px solid $grey;
    }
</style>
