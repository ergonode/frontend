/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-element-tree">
        <div
            v-for="position in level"
            class="list-element-tree__node"
            :class="['list-element-tree__node', {
                'list-element-tree__node--small': small,
                'list-element-tree__node--multiselect': multiselect
            }]"
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
        small: {
            type: Boolean,
            default: false,
        },
        multiselect: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element-tree {
        display: flex;

        &__node {
            width: 1px;
            margin: 0 8px 0 5px;
            background-color: $GREY;

            &--small {
                margin: 0 4px 0 5px;
            }

            &--multiselect {
                margin: 0 4px 0 15px;

                &.list-element-tree__node--small {
                    margin: 0 8px 0 11px;
                }
            }
        }
    }
</style>
