/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-element-tree">
        <div
            v-for="position in level"
            :class="listElementTreeNodeClasses"
            :key="position" />
        <slot />
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ListElementTree',
    props: {
        /**
         * Level of nesting list element components
         */
        level: {
            type: Number,
            default: 0,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        listElementTreeNodeClasses() {
            return [
                'list-element-tree__node',
                `list-element-tree__node--${this.size}`,
                {
                    'list-element-tree__node--multiselect': this.multiselect,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element-tree {
        display: flex;

        &__node {
            width: 1px;
            background-color: $GREY;

            &--small {
                margin: 0 6px 0 7px;
            }

            &--regular {
                margin: 0 8px 0 5px;
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
