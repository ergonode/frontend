/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
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
        classes() {
            return [
                'list-element-tree',
                `list-element-tree--${this.size}`,
                {
                    'list-element-tree--multiselect': this.multiselect,
                },
            ];
        },
        listElementTreeNodeClasses() {
            return [
                'list-element-tree__node',
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element-tree {
        $element: &;

        display: flex;

        &__node {
            width: 1px;
            background-color: $GREY;
        }

        &--small {
            min-height: 32px;

            #{$element}__node {
                margin: 0 6px 0 7px;
            }
        }

        &--regular {
            min-height: 40px;

            #{$element}__node {
                margin: 0 8px 0 5px;
            }
        }

        &--multiselect {
            #{$element}__node {
                margin: 0 4px 0 15px;
            }

            #{$element}--small {
                #{$element}__node {
                    margin: 0 8px 0 11px;
                }
            }
        }
    }
</style>
