/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tree-accordion-item-arrow-expander">
        <IconArrowRoundedDropdown
            :width="20"
            :height="20"
            :state="iconState" />
    </div>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';

export default {
    name: 'TreeAccordionItemArrowExpander',
    props: {
        isExpanded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        iconState() {
            return this.isExpanded
                ? ARROW.UP
                : ARROW.DOWN;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tree-accordion-item-arrow-expander {
        position: absolute;
        top: 50%;
        display: flex;
        transform: translate(-50%, -50%);
    }
</style>
