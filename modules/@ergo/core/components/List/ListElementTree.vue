/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-element-tree">
        <div
            v-for="position in level"
            class="list-element-tree__node"
            :key="position" />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ListElementTree',
    props: {
        level: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element-tree {
        display: flex;

        &__node {
            width: 1px;
            margin: 0 4px 0 15px;
            background-color: $GREY;
        }
    }
</style>
