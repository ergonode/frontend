/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <TreeAccordionItemArrowExpander
            v-if="isExpanderVisible"
            :is-expanded="isExpanded"
            @click.native.stop="onExpand" />
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'TreeAccordionItemNode',
    props: {
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
        isExpanderVisible: {
            type: Boolean,
            default: false,
        },
        isExpanded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'tree-accordion-item-node',
                `tree-accordion-item-node--${this.size}`,
            ];
        },
    },
    methods: {
        onExpand() {
            this.$emit('expand');
        },
    },
};
</script>

<style lang="scss" scoped>
    .tree-accordion-item-node {
        position: relative;
        width: 1px;
        height: 100%;
        background-color: $GREY;

        &--small {
            margin: 0 12px 0 11px;
        }

        &--regular {
            margin: 0 12px 0 11px;
        }
    }
</style>
