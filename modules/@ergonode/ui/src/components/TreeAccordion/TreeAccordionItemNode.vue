/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes" />
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
    },
    computed: {
        classes() {
            return [
                'tree-accordion-item-node',
                `tree-accordion-item-node--${this.size}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .tree-accordion-item-node {
        width: 1px;
        height: 100%;
        background-color: $GREY;

        &--small {
            margin: 0 12px 0 11px;
        }

        &--regular {
            margin: 0 12px;
        }
    }
</style>
