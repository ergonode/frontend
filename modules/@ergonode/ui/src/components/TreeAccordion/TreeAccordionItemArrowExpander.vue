/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tree-accordion-item-arrow-expander">
        <IconArrowSingle
            class="tree-accordion-item-arrow-expander__icon"
            :width="19"
            :height="19"
            :state="iconState" />
    </div>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import IconArrowSingle from '@UI/components/Icons/Arrows/IconArrowSingle';

export default {
    name: 'TreeAccordionItemArrowExpander',
    components: {
        IconArrowSingle,
    },
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

        &__icon {
            border: $BORDER_1_GREY;
            background-color: $WHITE;
            border-radius: 50%;
        }
    }
</style>
